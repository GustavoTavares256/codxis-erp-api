import { z } from 'zod'

export const stockMovementSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  reason: z.string().optional(),
})

export type StockMovementInput = z.infer<
  typeof stockMovementSchema
>