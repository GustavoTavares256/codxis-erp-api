import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { createSaleController } from '../controllers/create-sale.controller'

export async function salesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createSaleController,
  )
}