import type { FastifyReply, FastifyRequest } from 'fastify'

import { createSaleSchema } from '../schemas/sale.schema'
import { createSaleService } from '../services/create-sale.service'

export async function createSaleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createSaleSchema.parse(request.body)

  const user = request.user as {
    sub: string
    companyId: string
  }

  const sale = await createSaleService(
    user.companyId,
    user.sub,
    data,
  )

  return reply.status(201).send(sale)
}