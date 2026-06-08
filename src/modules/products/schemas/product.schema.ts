import { z } from 'zod'

export const productUnitSchema = z.enum([
  'UN',
  'CX',
  'PC',
  'KG',
  'G',
  'TON',
  'L',
  'ML',
  'M',
  'CM',
  'M2',
  'M3',
  'SC',
  'FD',
])

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),

  costPrice: z.number().positive(),
  salePrice: z.number().positive(),

  quantity: z.number().int().min(0).default(0),
  minimumStock: z.number().int().min(0).default(0),
  unit: productUnitSchema.default('UN'),

  categoryId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export const updateProductSchema = createProductSchema.partial()
export type UpdateProductInput = z.infer<typeof updateProductSchema>
