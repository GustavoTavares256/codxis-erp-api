import type { Prisma } from '@prisma/client'
import * as XLSX from 'xlsx'

import { prisma } from '../../../shared/database/prisma'
import {
  PRODUCT_IMPORT_EXPORT_FIELDS,
  PRODUCT_UNITS,
  REQUIRED_PRODUCT_IMPORT_FIELDS,
  type ProductImportError,
  type ProductImportRow,
  assertSupportedImportFile,
  parseCsv,
} from './product-import-export.utils'

type ImportProductsFile = {
  filename: string
  mimetype: string
  buffer: Buffer
}

type ValidProductRow = {
  name: string
  description?: string
  costPrice: number
  salePrice: number
  quantity: number
  minimumStock: number
  unit: (typeof PRODUCT_UNITS)[number]
  category?: string
  sku?: string
}

export async function importProductsService(
  companyId: string,
  file: ImportProductsFile,
) {
  assertSupportedImportFile(file.filename, file.mimetype)

  const rows = parseProductRows(file)
  const errors: ProductImportError[] = []
  let created = 0
  let updated = 0

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2
    const validation = validateProductImportRow(row, rowNumber)

    if (!validation.ok) {
      errors.push(...validation.errors)
      continue
    }

    try {
      const result = await saveImportedProduct(companyId, validation.data)

      if (result === 'created') created += 1
      if (result === 'updated') updated += 1
    } catch (error) {
      errors.push({
        row: rowNumber,
        message:
          error instanceof Error
            ? error.message
            : 'Nao foi possivel importar esta linha.',
      })
    }
  }

  return {
    created,
    updated,
    errors,
  }
}

function parseProductRows(file: ImportProductsFile): ProductImportRow[] {
  const lowerFilename = file.filename.toLowerCase()

  if (lowerFilename.endsWith('.xlsx') || lowerFilename.endsWith('.xls')) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' })
    const [firstSheetName] = workbook.SheetNames

    if (!firstSheetName) return []

    const worksheet = workbook.Sheets[firstSheetName]
    const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: '',
    })

    return jsonRows.map((row) => {
      const normalizedRow = Object.entries(row).reduce((record, [key, value]) => {
        record[key.trim().toLowerCase()] = value
        return record
      }, {} as Record<string, unknown>)

      return PRODUCT_IMPORT_EXPORT_FIELDS.reduce((record, field) => {
        record[field] = String(normalizedRow[field.toLowerCase()] ?? '').trim()
        return record
      }, {} as ProductImportRow)
    })
  }

  return parseCsv(file.buffer)
}

function validateProductImportRow(row: ProductImportRow, rowNumber: number) {
  const errors: ProductImportError[] = []

  REQUIRED_PRODUCT_IMPORT_FIELDS.forEach((field) => {
    if (!row[field]?.trim()) {
      errors.push({
        row: rowNumber,
        field,
        message: `Campo obrigatorio ausente: ${field}`,
      })
    }
  })

  const costPrice = parseMoney(row.costPrice)
  const salePrice = parseMoney(row.salePrice)
  const quantity = parseInteger(row.quantity)
  const minimumStock = parseInteger(row.minimumStock)
  const unit = normalizeUnit(row.unit)

  if (costPrice === null || costPrice < 0) {
    errors.push({
      row: rowNumber,
      field: 'costPrice',
      message: 'Preco de custo invalido.',
    })
  }

  if (salePrice === null || salePrice <= 0) {
    errors.push({
      row: rowNumber,
      field: 'salePrice',
      message: 'Preco de venda deve ser maior que zero.',
    })
  }

  if (quantity === null || quantity < 0) {
    errors.push({
      row: rowNumber,
      field: 'quantity',
      message: 'Quantidade invalida.',
    })
  }

  if (minimumStock === null || minimumStock < 0) {
    errors.push({
      row: rowNumber,
      field: 'minimumStock',
      message: 'Estoque minimo invalido.',
    })
  }

  if (!unit) {
    errors.push({
      row: rowNumber,
      field: 'unit',
      message: 'Unidade de medida invalida.',
    })
  }

  if (errors.length > 0) {
    return {
      ok: false as const,
      errors,
    }
  }

  return {
    ok: true as const,
    data: {
      name: row.name.trim(),
      description: row.description?.trim() || undefined,
      costPrice: costPrice as number,
      salePrice: salePrice as number,
      quantity: quantity as number,
      minimumStock: minimumStock as number,
      unit: unit as (typeof PRODUCT_UNITS)[number],
      category: row.category?.trim() || undefined,
      sku: row.sku?.trim() || undefined,
    },
  }
}

async function saveImportedProduct(companyId: string, data: ValidProductRow) {
  return prisma.$transaction(async (transaction) => {
    const categoryId = data.category
      ? await findOrCreateCategory(transaction, companyId, data.category)
      : undefined

    const payload = {
      name: data.name,
      description: data.description || '',
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      quantity: data.quantity,
      minimumStock: data.minimumStock,
      unit: data.unit,
      sku: data.sku,
      categoryId,
    }

    const existingProduct = data.sku
      ? await transaction.product.findFirst({
          where: {
            companyId,
            sku: data.sku,
          },
        })
      : null

    if (existingProduct) {
      await transaction.product.update({
        where: {
          id: existingProduct.id,
        },
        data: payload,
      })

      return 'updated' as const
    }

    await transaction.product.create({
      data: {
        ...payload,
        companyId,
      },
    })

    return 'created' as const
  })
}

async function findOrCreateCategory(
  transaction: Prisma.TransactionClient,
  companyId: string,
  name: string,
) {
  const existingCategory = await transaction.category.findFirst({
    where: {
      companyId,
      name,
    },
    select: {
      id: true,
    },
  })

  if (existingCategory) return existingCategory.id

  const category = await transaction.category.create({
    data: {
      companyId,
      name,
    },
    select: {
      id: true,
    },
  })

  return category.id
}

function parseMoney(value: string) {
  const trimmed = value.trim()
  const hasComma = trimmed.includes(',')
  const hasDot = trimmed.includes('.')
  const normalized =
    hasComma && hasDot
      ? trimmed.replace(/\./g, '').replace(',', '.')
      : trimmed.replace(',', '.')
  const numberValue = Number(normalized)

  return Number.isFinite(numberValue) ? numberValue : null
}

function parseInteger(value: string) {
  const numberValue = Number(value.trim())

  return Number.isInteger(numberValue) ? numberValue : null
}

function normalizeUnit(value: string) {
  const normalized = (value || 'UN').trim().toUpperCase()

  return PRODUCT_UNITS.includes(normalized as (typeof PRODUCT_UNITS)[number])
    ? (normalized as (typeof PRODUCT_UNITS)[number])
    : null
}
