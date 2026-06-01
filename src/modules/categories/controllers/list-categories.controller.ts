import type { FastifyReply, FastifyRequest } from 'fastify'

import { listCategoriesService } from '../services/list-categories.service'

export async function listCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const categories = await listCategoriesService(user.companyId)

  return reply.status(200).send(categories)
}