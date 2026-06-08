import type { FastifyReply, FastifyRequest } from 'fastify'

import { updateCompanyProfileSchema } from '../schemas'
import { updateCompanyProfileService } from '../services'

export async function updateCompanyProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = updateCompanyProfileSchema.parse(request.body)
  const user = request.user as {
    companyId: string
  }

  try {
    const company = await updateCompanyProfileService(user.companyId, data)

    return reply.status(200).send(company)
  } catch (error) {
    if (error instanceof Error && error.message === 'Empresa nao encontrada') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
