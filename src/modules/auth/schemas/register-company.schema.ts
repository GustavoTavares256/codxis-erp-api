import { z } from 'zod'

export const registerCompanySchema = z.object({
  companyName: z.string().min(1, 'Nome da empresa e obrigatorio'),
  document: z.string().optional(),
  phone: z.string().optional(),
  responsibleName: z.string().min(1, 'Nome do responsavel e obrigatorio'),
  email: z.string().email('E-mail invalido'),
  password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres'),
})

export type RegisterCompanyInput = z.infer<typeof registerCompanySchema>
