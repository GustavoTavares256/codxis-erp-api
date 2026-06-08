import type { FastifyReply, FastifyRequest } from 'fastify'

import { exportProductsService } from '../services/export-products.service'

export async function exportProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as {
    companyId: string
  }
  const query = request.query as {
    format?: string
  }
  const format = query.format === 'xlsx' ? 'xlsx' : 'csv'
  const exported = await exportProductsService(user.companyId, format)

  return reply
    .header('Content-Type', exported.contentType)
    .header(
      'Content-Disposition',
      `attachment; filename="${exported.filename}"`,
    )
    .send(exported.buffer)
}
