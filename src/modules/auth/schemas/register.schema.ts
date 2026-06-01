import { z } from 'zod'

export const registerSchema = z.object({
  companyName: z.string().min(2, 'Nome da empresa é obrigatório'),
  companyDocument: z.string().optional(),
  companyEmail: z.string().email('E-mail da empresa inválido').optional(),
  companyPhone: z.string().optional(),

  userName: z.string().min(2, 'Nome do usuário é obrigatório'),
  userEmail: z.string().email('E-mail do usuário inválido'),
  userPassword: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

export type RegisterInput = z.infer<typeof registerSchema>