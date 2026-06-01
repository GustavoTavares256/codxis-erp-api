import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { createCustomerController } from '../controllers/create-customer.controller'
import { deleteCustomerController } from '../controllers/delete-customer.controller'
import { getCustomerByIdController } from '../controllers/get-customer-by-id.controller'
import { listCustomersController } from '../controllers/list-customers.controller'
import { updateCustomerController } from '../controllers/update-customer.controller'

export async function customersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createCustomerController,
  )

  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listCustomersController,
  )

  app.get(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    getCustomerByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    updateCustomerController,
  )

  app.delete(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    deleteCustomerController,
  )
}
