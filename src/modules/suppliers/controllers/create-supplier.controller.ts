import type { FastifyReply, FastifyRequest } from 'fastify'

import { createSupplierSchema } from '../schemas/supplier.schema'
import { createSupplierService } from '../services/create-supplier.service'

export async function createSupplierController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createSupplierSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const supplier = await createSupplierService(user.companyId, data)

  return reply.status(201).send(supplier)
}
