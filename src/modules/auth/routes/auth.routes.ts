import type { FastifyInstance } from 'fastify'

import { loginController } from '../controllers/login.controller'
import { registerController } from '../controllers/register.controller'
import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerController)
  app.post('/login', loginController)

  app.get('/me', { preHandler: ensureAuthenticated }, async (request) => {
    return {
      user: request.user,
    }
  })
}