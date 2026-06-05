import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureCompanyActive } from '../../../shared/middlewares/ensure-company-active'

import { listFinancialController } from '../controllers/list-financial.controller'

import { createExpenseController } from '../controllers/create-expense.controller'

import { financialSummaryController } from '../controllers/financial-summary.controller'

export async function financialRoutes(
  app: FastifyInstance,
) {
  app.get(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    listFinancialController,
  )

  app.post(
  '/expense',
  {
    preHandler: [
      ensureAuthenticated,
      ensureCompanyActive,
    ],
  },
  createExpenseController,
)

app.get(
  '/summary',
  {
    preHandler: [
      ensureAuthenticated,
      ensureCompanyActive,
    ],
  },
  financialSummaryController,
)
}
