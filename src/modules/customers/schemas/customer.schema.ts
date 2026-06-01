import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().min(2, 'Nome do cliente é obrigatório'),
  document: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
})

export const updateCustomerSchema = createCustomerSchema.partial()

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
