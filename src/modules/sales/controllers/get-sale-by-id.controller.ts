import type { FastifyReply, FastifyRequest } from 'fastify'

import { getSaleByIdService } from '../services/get-sale-by-id.service'

export async function getSaleByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  const sale = await getSaleByIdService(
    user.companyId,
    params.id,
  )

  return reply.status(200).send(sale)
}