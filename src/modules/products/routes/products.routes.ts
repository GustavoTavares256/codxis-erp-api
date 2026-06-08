import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { ensureCompanyActive } from '../../../shared/middlewares/ensure-company-active'

import { createProductController } from '../controllers/create-product.controller'
import { listProductsController } from '../controllers/list-products.controller'
import { getProductByIdController } from '../controllers/get-product-by-id.controller'
import { updateProductController } from '../controllers/update-product.controller'
import { deleteProductController } from '../controllers/delete-product.controller'
import { exportProductsController } from '../controllers/export-products.controller'
import { importProductsController } from '../controllers/import-products.controller'

export async function productsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    createProductController,
  )

  app.get(
    '/',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    listProductsController,
  )

  app.get(
    '/export',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    exportProductsController,
  )

  app.post(
    '/import',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    importProductsController,
  )

  app.get(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    getProductByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    updateProductController,
  )

  app.delete(
    '/:id',
    {
      preHandler: [
        ensureAuthenticated,
        ensureCompanyActive,
      ],
    },
    deleteProductController,
  )
}
