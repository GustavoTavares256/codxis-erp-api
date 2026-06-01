import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { stockInController } from '../controllers/stock-in.controller'
import { stockOutController } from '../controllers/stock-out.controller'
import { listStockMovementsController } from '../controllers/list-stock-movements.controller'
import { listLowStockController } from '../controllers/list-low-stock.controller'

export async function stockRoutes(app: FastifyInstance) {
  app.post(
    '/in',
    {
      preHandler: ensureAuthenticated,
    },
    stockInController,
  )

  app.post(
    '/out',
    {
      preHandler: ensureAuthenticated,
    },
    stockOutController,
  )

  app.get(
    '/movements',
    {
      preHandler: ensureAuthenticated,
    },
    listStockMovementsController,
  )

  app.get(
  '/low-stock',
  {
    preHandler: ensureAuthenticated,
  },
  listLowStockController,
)
}