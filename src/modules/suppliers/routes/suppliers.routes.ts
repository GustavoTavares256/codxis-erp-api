import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { createSupplierController } from '../controllers/create-supplier.controller'
import { deleteSupplierController } from '../controllers/delete-supplier.controller'
import { getSupplierByIdController } from '../controllers/get-supplier-by-id.controller'
import { listSuppliersController } from '../controllers/list-suppliers.controller'
import { updateSupplierController } from '../controllers/update-supplier.controller'

export async function suppliersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createSupplierController,
  )

  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listSuppliersController,
  )

  app.get(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    getSupplierByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    updateSupplierController,
  )

  app.delete(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    deleteSupplierController,
  )
}
