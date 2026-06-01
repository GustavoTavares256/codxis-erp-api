import type { FastifyReply, FastifyRequest } from 'fastify'

import { deleteSupplierService } from '../services/delete-supplier.service'

export async function deleteSupplierController(
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
    const result = await deleteSupplierService(user.companyId, params.id)

    return reply.status(200).send(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'Fornecedor não encontrado') {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
