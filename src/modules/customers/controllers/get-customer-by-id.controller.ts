import type { FastifyReply, FastifyRequest } from 'fastify'

import { getCustomerByIdService } from '../services/get-customer-by-id.service'

export async function getCustomerByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  try {
    const customer = await getCustomerByIdService(user.companyId, params.id)

    return reply.status(200).send(customer)
  } catch (error) {
    if (error instanceof Error && error.message === 'Cliente não encontrado') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
