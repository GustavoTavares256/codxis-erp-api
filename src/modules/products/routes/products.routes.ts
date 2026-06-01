import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { createProductController } from '../controllers/create-product.controller'
import { listProductsController } from '../controllers/list-products.controller'
import { getProductByIdController } from '../controllers/get-product-by-id.controller'
import { updateProductController } from '../controllers/update-product.controller'
import { deleteProductController } from '../controllers/delete-product.controller'

export async function productsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createProductController,
  )

  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listProductsController,
  )

  app.get(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    getProductByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    updateProductController,
  )

  app.delete(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    deleteProductController,
  )
}