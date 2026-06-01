import type { FastifyInstance } from 'fastify'

import { stockRoutes } from './stock.routes'

export function registerStockModule(app: FastifyInstance) {
  app.register(stockRoutes, {
    prefix: '/stock',
  })
}