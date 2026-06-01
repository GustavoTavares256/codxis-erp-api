import type { FastifyReply, FastifyRequest } from 'fastify'

import { listLowStockService } from '../services/list-low-stock.service'

export async function listLowStockController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const products = await listLowStockService(user.companyId)

  return reply.status(200).send(products)
}