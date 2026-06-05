import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureSuperAdmin } from '../../../shared/middlewares/ensure-super-admin'

import { impersonateCompanyController } from '../controllers/impersonate-company.controller'
import { listCompaniesController } from '../controllers/list-companies.controller'
import { updateCompanyLicenseController } from '../controllers/update-company-license.controller'
import { updateCompanyPlanController } from '../controllers/update-company-plan.controller'
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

  app.patch(
    '/companies/:id/license',
    {
      preHandler: [
        ensureAuthenticated,
        ensureSuperAdmin,
      ],
    },
    updateCompanyLicenseController,
  )

  app.patch(
    '/companies/:id/plan',
    {
      preHandler: [
        ensureAuthenticated,
        ensureSuperAdmin,
      ],
    },
    updateCompanyPlanController,
  )

  app.post(
    '/companies/:id/impersonate',
    {
      preHandler: [
        ensureAuthenticated,
        ensureSuperAdmin,
      ],
    },
    impersonateCompanyController,
  )
}
