import type { FastifyReply, FastifyRequest } from 'fastify'

import { registerCompanySchema } from '../schemas/register-company.schema'
import { registerCompanyService } from '../services/register-company.service'

export async function registerCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = registerCompanySchema.parse(request.body)

  const result = await registerCompanyService(request.server, data)

  return reply.status(201).send(result)
}
