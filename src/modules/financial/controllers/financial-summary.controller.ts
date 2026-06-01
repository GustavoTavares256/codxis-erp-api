import type { FastifyReply, FastifyRequest } from 'fastify'

import { financialSummaryService } from '../services/financial-summary.service'

export async function financialSummaryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const summary = await financialSummaryService(
    user.companyId,
  )

  return reply.status(200).send(summary)
}