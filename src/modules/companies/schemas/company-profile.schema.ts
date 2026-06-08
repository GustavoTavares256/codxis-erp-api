import { z } from 'zod'

export const updateCompanyProfileSchema = z.object({
  name: z.string().trim().min(2, 'Nome da empresa e obrigatorio').optional(),
  fantasyName: z.string().trim().optional(),
  document: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
  website: z.string().trim().optional(),
  address: z.string().trim().optional(),
  logoUrl: z.string().trim().optional(),
})

export type UpdateCompanyProfileInput = z.infer<
  typeof updateCompanyProfileSchema
>
