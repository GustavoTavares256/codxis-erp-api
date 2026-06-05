import type { FastifyReply, FastifyRequest } from 'fastify'

import { endImpersonationService } from '../services/end-impersonation.service'

type SupportTokenPayload = {
  role?: string
  companyId?: string
  originalAdminId?: string
  impersonating?: boolean
  supportStartedAt?: string
}

export async function endImpersonationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as SupportTokenPayload

  if (
    user.role !== 'SUPPORT' ||
    !user.impersonating ||
    !user.companyId ||
    !user.originalAdminId
  ) {
    return reply.status(403).send({
      message: 'Modo suporte invalido',
    })
  }

  await endImpersonationService({
    companyId: user.companyId,
    originalAdminId: user.originalAdminId,
    supportStartedAt: user.supportStartedAt,
  })

  return reply.status(200).send({
    ok: true,
  })
}
