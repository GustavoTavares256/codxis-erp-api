import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { updateCompanyStatusService } from '../services/update-company-status.service'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  status: z.enum([
    'ACTIVE',
    'BLOCKED',
    'TRIAL',
    'EXPIRED',
  ]),
})

export async function updateCompanyStatusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const { status } = bodySchema.parse(request.body)

  const company =
    await updateCompanyStatusService(
      id,
      status,
    )

  return reply.status(200).send(company)
}