import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail invalido'),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
