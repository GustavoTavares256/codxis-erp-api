import { createHash } from 'node:crypto'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../shared/database/prisma'
import { AppError } from '../../../shared/errors/app-error'
import type { ResetPasswordInput } from '../schemas/reset-password.schema'

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function resetPasswordService(data: ResetPasswordInput) {
  const tokenHash = hashToken(data.token)

  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      userId: true,
    },
  })

  if (!resetToken) {
    throw new AppError('Token invalido ou expirado', 400)
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    }),
    prisma.passwordResetToken.update({
      where: {
        id: resetToken.id,
      },
      data: {
        usedAt: new Date(),
      },
    }),
  ])

  return {
    message: 'Senha redefinida com sucesso.',
  }
}
