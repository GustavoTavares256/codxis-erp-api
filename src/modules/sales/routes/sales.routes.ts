import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { createSaleController } from '../controllers/create-sale.controller'
import { listSalesController } from '../controllers/list-sales.controller'
import { getSaleByIdController } from '../controllers/get-sale-by-id.controller'

export async function salesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createSaleController,
  )

  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listSalesController,
  )

  app.get(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    getSaleByIdController,
  )
}