import {
  AuditLogAction,
  Prisma,
} from '@prisma/client'

import { prisma } from '../../../shared/database/prisma'

type CreateAuditLogData = {
  action: AuditLogAction
  entity: string
  entityId: string
  companyId?: string | null
  userId?: string | null
  oldValue?: Prisma.InputJsonValue
  newValue?: Prisma.InputJsonValue
}

export async function createAuditLogService(
  data: CreateAuditLogData,
  client: Prisma.TransactionClient = prisma,
) {
  return client.auditLog.create({
    data,
  })
}
