import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureCompanyActive } from '../../../shared/middlewares/ensure-company-active'
import {
  getCompanyProfileController,
  updateCompanyProfileController,
} from '../controllers'

export async function companyRoutes(app: FastifyInstance) {
  app.get(
    '/profile',
    {
      preHandler: [ensureAuthenticated, ensureCompanyActive],
    },
    getCompanyProfileController,
  )

  app.put(
    '/profile',
    {
      preHandler: [ensureAuthenticated, ensureCompanyActive],
    },
    updateCompanyProfileController,
  )
}
