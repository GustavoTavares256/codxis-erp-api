import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureCompanyActive } from '../../../shared/middlewares/ensure-company-active'

import { createCustomerController } from '../controllers/create-customer.controller'
import { deleteCustomerController } from '../controllers/delete-customer.controller'
import { getCustomerByIdController } from '../controllers/get-customer-by-id.controller'
import { listCustomersController } from '../controllers/list-customers.controller'
import { updateCustomerController } from '../controllers/update-customer.controller'

export async function customersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    createCustomerController,
  )

  app.get(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    listCustomersController,
  )

  app.get(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    getCustomerByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    updateCustomerController,
  )

  app.delete(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    deleteCustomerController,
  )
}
