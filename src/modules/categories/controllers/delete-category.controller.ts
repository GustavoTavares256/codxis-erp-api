import type { FastifyReply, FastifyRequest } from 'fastify'

import { deleteCategoryService } from '../services/delete-category.service'

export async function deleteCategoryController(
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
    const result = await deleteCategoryService(user.companyId, params.id)

    return reply.status(200).send(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'Categoria não encontrada') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
