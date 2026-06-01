import { z } from 'zod'

export const createExpenseSchema = z.object({
  description: z.string().min(2),
  amount: z.number().positive(),
  dueDate: z.string().datetime().optional(),
})

export type CreateExpenseInput = z.infer<
  typeof createExpenseSchema
>