import type { FastifyReply, FastifyRequest } from 'fastify'

import { listFinancialService } from '../services/list-financial.service'

export async function listFinancialController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const transactions = await listFinancialService(
    user.companyId,
  )

  return reply.status(200).send(transactions)
}