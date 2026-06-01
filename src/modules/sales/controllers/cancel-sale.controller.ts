import type { FastifyReply, FastifyRequest } from 'fastify'

import { cancelSaleService } from '../services/cancel-sale.service'

export async function cancelSaleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  const sale = await cancelSaleService(
    user.companyId,
    params.id,
  )

  return reply.status(200).send(sale)
}