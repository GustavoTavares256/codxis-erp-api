import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { updateCompanyPlanService } from '../services/update-company-plan.service'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  plan: z.enum([
    'FREE',
    'BASIC',
    'PRO',
    'ENTERPRISE',
  ]),
})

export async function updateCompanyPlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const { plan } = bodySchema.parse(request.body)

  const user = request.user as {
    sub: string
  }

  const company =
    await updateCompanyPlanService(
      id,
      plan,
      user.sub,
    )

  return reply.status(200).send(company)
}
