import type { FastifyReply, FastifyRequest } from 'fastify'

import { createCustomerSchema } from '../schemas/customer.schema'
import { createCustomerService } from '../services/create-customer.service'

export async function createCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createCustomerSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const customer = await createCustomerService(user.companyId, data)

  return reply.status(201).send(customer)
}
