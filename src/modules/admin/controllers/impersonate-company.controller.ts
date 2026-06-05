import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { impersonateCompanyService } from '../services/impersonate-company.service'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function impersonateCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)
  const user = request.user as {
    sub: string
  }

  const result = await impersonateCompanyService({
    app: request.server,
    companyId: id,
    superAdminId: user.sub,
  })

  return reply.status(200).send(result)
}
