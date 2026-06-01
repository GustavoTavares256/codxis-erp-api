import type { FastifyInstance } from 'fastify'
import { authRoutes } from './auth.routes'

export function registerAuthModule(app: FastifyInstance) {
  app.register(authRoutes, {
    prefix: '/auth',
  })
}
