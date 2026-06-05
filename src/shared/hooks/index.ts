import type { FastifyInstance } from 'fastify'
import type { AuditLogAction } from '@prisma/client'

import { prisma } from '../database/prisma'

const WRITE_METHODS = new Set([
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
])

export function registerHooks(app: FastifyInstance) {
  app.addHook('onResponse', async (request, reply) => {
    const user = request.user as
      | {
          role?: string
          companyId?: string
          originalAdminId?: string
          impersonating?: boolean
        }
      | undefined

    if (
      !user?.impersonating ||
      user.role !== 'SUPPORT' ||
      !user.companyId ||
      !user.originalAdminId ||
      !WRITE_METHODS.has(request.method) ||
      request.url === '/auth/impersonation/end'
    ) {
      return
    }

    try {
      await prisma.auditLog.create({
        data: {
          action: 'SUPPORT_ACTION_EXECUTED' as AuditLogAction,
          entity: 'SupportSession',
          entityId: user.companyId,
          companyId: user.companyId,
          userId: user.originalAdminId,
          newValue: {
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            timestamp: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      request.log.error({ error }, 'Failed to audit support action')
    }
  })
}
