import type { FastifyReply, FastifyRequest } from 'fastify'

import { stockMovementSchema } from '../schemas/stock.schema'
import { stockInService } from '../services/stock-in.service'

export async function stockInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = stockMovementSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const product = await stockInService(
    user.companyId,
    data,
  )

  return reply.status(200).send(product)
}