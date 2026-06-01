import type { FastifyReply, FastifyRequest } from 'fastify'

import { getCategoryByIdService } from '../services/get-category-by-id.service'

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  try {
    const category = await getCategoryByIdService(user.companyId, params.id)

    return reply.status(200).send(category)
  } catch (error) {
    if (error instanceof Error && error.message === 'Categoria não encontrada') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
