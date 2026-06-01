import type { FastifyInstance } from 'fastify'

import { suppliersRoutes } from './suppliers.routes'

export function registerSuppliersModule(app: FastifyInstance) {
  app.register(suppliersRoutes, {
    prefix: '/suppliers',
  })
}
