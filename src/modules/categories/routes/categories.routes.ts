import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

import { createCategoryController } from '../controllers/create-category.controller'
import { deleteCategoryController } from '../controllers/delete-category.controller'
import { getCategoryByIdController } from '../controllers/get-category-by-id.controller'
import { listCategoriesController } from '../controllers/list-categories.controller'
import { updateCategoryController } from '../controllers/update-category.controller'

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    createCategoryController,
  )

  app.get(
    '/',
    {
      preHandler: ensureAuthenticated,
    },
    listCategoriesController,
  )

  app.get(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    getCategoryByIdController,
  )

  app.put(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    updateCategoryController,
  )

  app.delete(
    '/:id',
    {
      preHandler: ensureAuthenticated,
    },
    deleteCategoryController,
  )
}
