import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureCompanyActive } from '../../../shared/middlewares/ensure-company-active'
import { dashboardController } from '../controllers/dashboard.controller'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    dashboardController,
  )
}
