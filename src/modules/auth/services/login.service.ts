import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'

import { prisma } from '../../../shared/database/prisma'
import type { LoginInput } from '../schemas/login.schema'

export async function loginService(app: FastifyInstance, data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      company: true,
    },
  })

  if (!user) {
    throw new Error('E-mail ou senha inválidos')
  }

  const passwordMatches = await bcrypt.compare(data.password, user.password)

  if (!passwordMatches) {
    throw new Error('E-mail ou senha inválidos')
  }

  const token = app.jwt.sign({
    sub: user.id,
    role: user.role,
    companyId: user.companyId,
  })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      companyName: user.company?.name ?? null,
    },
  }
}