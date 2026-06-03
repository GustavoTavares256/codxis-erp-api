import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureSuperAdmin } from '../../../shared/middlewares/ensure-super-admin'

import { listCompaniesController } from '../controllers/list-companies.controller'

import { updateCompanyStatusController } from '../controllers/update-company-status.controller'

export async function adminRoutes(
  app: FastifyInstance,
) {
  app.get
  (
    '/companies',
    {
      preHandler: [
        ensureAuthenticated,
        ensureSuperAdmin,
      ],
    },
    listCompaniesController,
  )

  app.patch(
  '/companies/:id/status',
  {
    preHandler: [
      ensureAuthenticated,
      ensureSuperAdmin,
    ],
  },
  updateCompanyStatusController,
)
}