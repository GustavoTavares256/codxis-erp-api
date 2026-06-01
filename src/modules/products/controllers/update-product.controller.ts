import type { FastifyReply, FastifyRequest } from 'fastify'

import { updateProductSchema } from '../schemas/product.schema'
import { updateProductService } from '../services/update-product.service'

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = updateProductSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  const product = await updateProductService(user.companyId, params.id, data)

  return reply.status(200).send(product)
}