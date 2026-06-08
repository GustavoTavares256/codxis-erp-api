import { z } from 'zod'

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token obrigatorio'),
  password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres'),
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
