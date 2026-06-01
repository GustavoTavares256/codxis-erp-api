import type { FastifyReply, FastifyRequest } from 'fastify'

import { listProductsService } from '../services/list-products.service'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const products = await listProductsService(user.companyId)

  return reply.status(200).send(products)
}