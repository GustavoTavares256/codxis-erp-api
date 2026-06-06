import type { FastifyInstance } from 'fastify'

import { endImpersonationController } from '../controllers/end-impersonation.controller'
import { loginController } from '../controllers/login.controller'
import { registerCompanyController } from '../controllers/register-company.controller'
import { registerController } from '../controllers/register.controller'
import { ensureAuthenticated } from '../../../shared/middlewares/ensure-authenticated'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerController)
  app.post('/register-company', registerCompanyController)
  app.post('/login', loginController)
  app.post(
    '/impersonation/end',
    { preHandler: ensureAuthenticated },
    endImpersonationController,
  )

  app.get('/me', { preHandler: ensureAuthenticated }, async (request) => {
    return {
      user: request.user,
    }
  })
}
