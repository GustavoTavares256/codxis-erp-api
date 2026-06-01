import type { FastifyReply, FastifyRequest } from 'fastify'

import { loginSchema } from '../schemas/login.schema'
import { loginService } from '../services/login.service'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = loginSchema.parse(request.body)

  const result = await loginService(request.server, data)

  return reply.status(200).send(result)
}