import type { FastifyReply, FastifyRequest } from 'fastify'

import { createProductSchema } from '../schemas/product.schema'
import { createProductService } from '../services/create-product.service'

export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createProductSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const product = await createProductService(user.companyId, data)

  return reply.status(201).send(product)
}