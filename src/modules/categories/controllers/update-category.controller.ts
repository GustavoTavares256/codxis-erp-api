import type { FastifyReply, FastifyRequest } from 'fastify'

import { updateCategorySchema } from '../schemas/category.schema'
import { updateCategoryService } from '../services/update-category.service'

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = updateCategorySchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  try {
    const category = await updateCategoryService(user.companyId, params.id, data)

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
