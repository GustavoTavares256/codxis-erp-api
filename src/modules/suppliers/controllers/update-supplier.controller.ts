import type { FastifyReply, FastifyRequest } from 'fastify'

import { updateSupplierSchema } from '../schemas/supplier.schema'
import { updateSupplierService } from '../services/update-supplier.service'

export async function updateSupplierController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = updateSupplierSchema.parse(request.body)

  const user = request.user as {
    companyId: string
  }

  const params = request.params as {
    id: string
  }

  try {
    const supplier = await updateSupplierService(user.companyId, params.id, data)

    return reply.status(200).send(supplier)
  } catch (error) {
    if (error instanceof Error && error.message === 'Fornecedor não encontrado') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
