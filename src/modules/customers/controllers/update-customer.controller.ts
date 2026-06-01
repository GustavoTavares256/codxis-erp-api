import type { FastifyReply, FastifyRequest } from 'fastify'

import { updateCustomerSchema } from '../schemas/customer.schema'
import { updateCustomerService } from '../services/update-customer.service'

export async function updateCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = updateCustomerSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  try {
    const customer = await updateCustomerService(user.companyId, params.id, data)

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
