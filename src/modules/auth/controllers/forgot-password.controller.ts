import type { FastifyReply, FastifyRequest } from 'fastify'

import { forgotPasswordSchema } from '../schemas/forgot-password.schema'
import { forgotPasswordService } from '../services/forgot-password.service'

export async function forgotPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = forgotPasswordSchema.parse(request.body)

  const result = await forgotPasswordService(data)

  return reply.status(200).send(result)
}
