import type { FastifyReply, FastifyRequest } from 'fastify'

export async function ensureSuperAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    role?: string
  }

  if (user.role !== 'SUPER_ADMIN') {
    return reply.status(403).send({
      message: 'Acesso permitido apenas para SUPER_ADMIN',
    })
  }
}