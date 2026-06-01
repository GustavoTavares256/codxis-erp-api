import type { FastifyReply, FastifyRequest } from 'fastify'

import { deleteProductService } from '../services/delete-product.service'

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  const result = await deleteProductService(
    user.companyId,
    params.id,
  )

  return reply.status(200).send(result)
}