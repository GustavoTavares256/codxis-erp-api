import { createHash, randomBytes } from 'node:crypto'

import { prisma } from '../../../shared/database/prisma'
import type { ForgotPasswordInput } from '../schemas/forgot-password.schema'

const RESET_TOKEN_EXPIRES_IN_MS = 60 * 60 * 1000

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function forgotPasswordService(data: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      email: true,
    },
  })

  const message =
    'Se o e-mail estiver cadastrado, enviaremos as instrucoes para redefinir a senha.'

  if (!user) {
    return { message }
  }

  const token = randomBytes(32).toString('hex')
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRES_IN_MS)

  await prisma.$transaction([
    prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    }),
    prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    }),
  ])

  const resetUrl = `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}/reset-password?token=${token}`

  console.log('Password reset requested:', {
    email: user.email,
    resetUrl,
    expiresAt,
  })

  if (process.env.NODE_ENV === 'production') {
    return { message }
  }

  return {
    message,
    resetToken: token,
    resetUrl,
  }
}
