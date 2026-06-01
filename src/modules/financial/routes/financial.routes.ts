import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { listFinancialController } from '../controllers/list-financial.controller'

import { createExpenseController } from '../controllers/create-expense.controller'

import { financialSummaryController } from '../controllers/financial-summary.controller'

export async function financialRoutes(
  app: FastifyInstance,
) {
  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listFinancialController,
  )

  app.post(
  '/expense',
  {
    preHandler: ensureAuthenticated,
  },
  createExpenseController,
)

app.get(
  '/summary',
  {
    preHandler: ensureAuthenticated,
  },
  financialSummaryController,
)
}
