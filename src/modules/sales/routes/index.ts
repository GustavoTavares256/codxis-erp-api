import type { FastifyInstance } from 'fastify'

import { salesRoutes } from './sales.routes'

export function registerSalesModule(app: FastifyInstance) {
  app.register(salesRoutes, {
    prefix: '/sales',
  })
}
