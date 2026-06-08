import type { FastifyReply, FastifyRequest } from 'fastify'

import { getCompanyProfileService } from '../services'

export async function getCompanyProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  try {
    const company = await getCompanyProfileService(user.companyId)

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
