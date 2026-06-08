import * as XLSX from 'xlsx'

import { prisma } from '../../../shared/database/prisma'
import {
  PRODUCT_IMPORT_EXPORT_FIELDS,
  escapeCsvValue,
} from './product-import-export.utils'

type ExportProductsFormat = 'csv' | 'xlsx'

export async function exportProductsService(
  companyId: string,
  format: ExportProductsFormat,
) {
  const products = await prisma.product.findMany({
    where: {
      companyId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const rows = products.map((product) => ({
    name: product.name,
    description: product.description || '',
    costPrice: product.costPrice.toString(),
    salePrice: product.salePrice.toString(),
    quantity: product.quantity,
    minimumStock: product.minimumStock,
    unit: product.unit || 'UN',
    category: product.category?.name || '',
    sku: product.sku || '',
  }))

  if (format === 'xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(rows, {
      header: [...PRODUCT_IMPORT_EXPORT_FIELDS],
    })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos')

    return {
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: 'produtos.xlsx',
      buffer: XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      }) as Buffer,
    }
  }

  const csv = [
    PRODUCT_IMPORT_EXPORT_FIELDS.join(','),
    ...rows.map((row) =>
      PRODUCT_IMPORT_EXPORT_FIELDS.map((field) => escapeCsvValue(row[field])).join(','),
    ),
  ].join('\n')

  return {
    contentType: 'text/csv; charset=utf-8',
    filename: 'produtos.csv',
    buffer: Buffer.from(`\uFEFF${csv}`, 'utf8'),
  }
}
