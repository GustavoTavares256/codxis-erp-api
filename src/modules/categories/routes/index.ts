import type { FastifyInstance } from 'fastify'

import { categoriesRoutes } from './categories.routes'

export function registerCategoriesModule(app: FastifyInstance) {
  app.register(categoriesRoutes, {
    prefix: '/categories',
  })
}