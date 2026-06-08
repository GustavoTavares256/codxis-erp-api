import type { FastifyReply, FastifyRequest } from 'fastify'

import { resetPasswordSchema } from '../schemas/reset-password.schema'
import { resetPasswordService } from '../services/reset-password.service'

export async function resetPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = resetPasswordSchema.parse(request.body)

  const result = await resetPasswordService(data)

  return reply.status(200).send(result)
}
