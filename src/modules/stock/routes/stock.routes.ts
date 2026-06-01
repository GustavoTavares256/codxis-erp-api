import type { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'
import { stockInController } from '../controllers/stock-in.controller'
import { stockOutController } from '../controllers/stock-out.controller'

export async function stockRoutes(app: FastifyInstance) {
  app.post('/in', { preHandler: ensureAuthenticated }, stockInController)

  app.post('/out', { preHandler: ensureAuthenticated }, stockOutController)
}