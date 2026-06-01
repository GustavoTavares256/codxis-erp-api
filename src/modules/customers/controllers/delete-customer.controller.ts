import type { FastifyReply, FastifyRequest } from 'fastify'

import { deleteCustomerService } from '../services/delete-customer.service'

export async function deleteCustomerController(
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
    const result = await deleteCustomerService(user.companyId, params.id)

    return reply.status(200).send(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'Cliente não encontrado') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
