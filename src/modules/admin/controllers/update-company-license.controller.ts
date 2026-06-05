import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { updateCompanyLicenseService } from '../services/update-company-license.service'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  licenseExpiresAt: z.string().min(1).refine(
    (value) => !Number.isNaN(new Date(value).getTime()),
    {
      message: 'Data inválida',
    },
  ).transform((value) => new Date(value)),
})

export async function updateCompanyLicenseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const { licenseExpiresAt } = bodySchema.parse(request.body)

  const user = request.user as {
    sub: string
  }

  const company =
    await updateCompanyLicenseService(
      id,
      licenseExpiresAt,
      user.sub,
    )

  return reply.status(200).send(company)
}
