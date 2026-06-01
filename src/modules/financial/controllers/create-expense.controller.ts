import type { FastifyReply, FastifyRequest } from 'fastify'

import { createExpenseSchema } from '../schemas/financial.schema'
import { createExpenseService } from '../services/create-expense.service'

export async function createExpenseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createExpenseSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const expense = await createExpenseService(user.companyId, data)

  return reply.status(201).send(expense)
}