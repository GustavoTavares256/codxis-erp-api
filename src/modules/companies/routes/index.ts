import type { FastifyInstance } from 'fastify'

import { companyRoutes } from './company.routes'

export function registerCompaniesModule(app: FastifyInstance) {
  app.register(companyRoutes, {
    prefix: '/company',
  })
}
