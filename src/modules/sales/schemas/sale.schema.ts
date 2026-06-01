import { z } from 'zod'

export const createSaleSchema = z.object({
  customerId: z.string().uuid().optional(),

  paymentMethod: z.enum([
    'PIX',
    'CASH',
    'CARD',
  ]),

  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
})

export type CreateSaleInput = z.infer<
  typeof createSaleSchema
>