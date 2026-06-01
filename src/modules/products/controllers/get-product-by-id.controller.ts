import type { FastifyReply, FastifyRequest } from 'fastify'

import { getProductByIdService } from '../services/get-product-by-id.service'

export async function getProductByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  const product = await getProductByIdService(user.companyId, params.id)

  return reply.status(200).send(product)
}