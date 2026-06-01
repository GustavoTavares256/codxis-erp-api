import type { FastifyInstance } from 'fastify'

import { dashboardRoutes } from './dashboard.routes'

export function registerDashboardModule(app: FastifyInstance) {
  app.register(dashboardRoutes, {
    prefix: '/dashboard',
  })
}