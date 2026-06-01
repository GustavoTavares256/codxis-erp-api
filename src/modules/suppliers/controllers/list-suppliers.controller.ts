import type { FastifyReply, FastifyRequest } from 'fastify'

import { listSuppliersService } from '../services/list-suppliers.service'

export async function listSuppliersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const suppliers = await listSuppliersService(user.companyId)

  return reply.status(200).send(suppliers)
}
