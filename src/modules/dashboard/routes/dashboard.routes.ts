import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { dashboardController } from '../controllers/dashboard.controller'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    dashboardController,
  )
}