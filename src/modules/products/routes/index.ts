import type { FastifyInstance } from 'fastify'

import { productsRoutes } from './products.routes'

export function registerProductsModule(app: FastifyInstance) {
  app.register(productsRoutes, {
    prefix: '/products',
  })
}