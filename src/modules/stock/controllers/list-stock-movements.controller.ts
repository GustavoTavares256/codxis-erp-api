import type { FastifyReply, FastifyRequest } from 'fastify'

import { listStockMovementsService } from '../services/list-stock-movements.service'

export async function listStockMovementsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const movements = await listStockMovementsService(
    user.companyId,
  )

  return reply.status(200).send(movements)
}