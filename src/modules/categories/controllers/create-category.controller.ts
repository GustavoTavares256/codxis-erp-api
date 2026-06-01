import type { FastifyReply, FastifyRequest } from 'fastify'

import { createCategorySchema } from '../schemas/category.schema'
import { createCategoryService } from '../services/create-category.service'

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createCategorySchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const category = await createCategoryService(user.companyId, data)

  return reply.status(201).send(category)
}