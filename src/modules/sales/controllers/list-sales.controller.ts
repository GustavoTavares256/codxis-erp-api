import type { FastifyReply, FastifyRequest } from 'fastify'

import { listSalesService } from '../services/list-sales.service'

export async function listSalesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const sales = await listSalesService(user.companyId)

  return reply.status(200).send(sales)
}