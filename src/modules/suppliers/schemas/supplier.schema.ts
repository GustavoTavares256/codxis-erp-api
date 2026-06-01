import { z } from 'zod'

export const createSupplierSchema = z.object({
  name: z.string().min(2, 'Nome do fornecedor é obrigatório'),
  document: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
})

export const updateSupplierSchema = createSupplierSchema.partial()

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>
