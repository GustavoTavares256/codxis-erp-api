import type { FastifyInstance } from 'fastify'

import { customersRoutes } from './customers.routes'

export function registerCustomersModule(app: FastifyInstance) {
  app.register(customersRoutes, {
    prefix: '/customers',
  })
}
