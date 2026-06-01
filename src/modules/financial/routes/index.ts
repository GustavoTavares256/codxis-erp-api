import type { FastifyInstance } from 'fastify'

import { financialRoutes } from './financial.routes'

export function registerFinancialModule(
  app: FastifyInstance,
) {
  app.register(financialRoutes, {
    prefix: '/financial',
  })
}