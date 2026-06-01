import type { FastifyReply, FastifyRequest } from 'fastify'

import { stockMovementSchema } from '../schemas/stock.schema'
import { stockOutService } from '../services/stock-out.service'

export async function stockOutController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = stockMovementSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const product = await stockOutService(
    user.companyId,
    data,
  )

  return reply.status(200).send(product)
}