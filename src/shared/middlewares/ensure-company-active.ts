import type { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../database/prisma'

export async function ensureCompanyActive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userPayload = request.user as {
    companyId?: string
    impersonating?: boolean
    sub: string
    role: string
  }

  if (userPayload.role === 'SUPER_ADMIN') {
    return
  }

  if (userPayload.role === 'SUPPORT' && userPayload.impersonating) {
    if (!userPayload.companyId) {
      return reply.status(403).send({
        message: 'Empresa nao encontrada para o modo suporte',
      })
    }

    const company = await prisma.company.findUnique({
      where: {
        id: userPayload.companyId,
      },
      select: {
        id: true,
      },
    })

    if (!company) {
      return reply.status(403).send({
        message: 'Empresa nao encontrada para o modo suporte',
      })
    }

    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userPayload.sub,
    },
    include: {
      company: true,
    },
  })

  if (!user || !user.company) {
    return reply.status(403).send({
      message: 'Empresa não encontrada para este usuário',
    })
  }

  if (
    user.company.status === 'BLOCKED' ||
    user.company.status === 'EXPIRED'
  ) {
    return reply.status(403).send({
      message: 'Licença expirada ou bloqueada. Entre em contato com a CodXis.',
    })
  }

  if (
    user.company.licenseExpiresAt &&
    user.company.licenseExpiresAt < new Date()
  ) {
    return reply.status(403).send({
      message: 'Licença expirada. Entre em contato com a CodXis.',
    })
  }
}
