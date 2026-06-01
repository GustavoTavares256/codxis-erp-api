import { FastifyReply, FastifyRequest } from 'fastify'
import { registerSchema } from '../schemas/register.schema'
import { registerService } from '../services/register.service'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = registerSchema.parse(request.body)

  const result = await registerService(data)

  return reply.status(201).send(result)
}