import type { FastifyInstance } from 'fastify'

import { adminRoutes } from './admin.routes'

export function registerAdminModule(
  app: FastifyInstance,
) {
  app.register(adminRoutes, {
    prefix: '/admin',
  })
}