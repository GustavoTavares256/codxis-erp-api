import type { FastifyReply, FastifyRequest } from 'fastify'

import { dashboardService } from '../services/dashboard.service'

export async function dashboardController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const dashboard = await dashboardService(user.companyId)

  return reply.status(200).send(dashboard)
}