import type { AuditLogAction } from '@prisma/client'

import { createAuditLogService } from '../../admin/services/create-audit-log.service'

type EndImpersonationData = {
  companyId: string
  originalAdminId: string
  supportStartedAt?: string
}

export async function endImpersonationService({
  companyId,
  originalAdminId,
  supportStartedAt,
}: EndImpersonationData) {
  const endedAt = new Date()

  await createAuditLogService({
    action: 'COMPANY_IMPERSONATION_ENDED' as AuditLogAction,
    entity: 'Company',
    entityId: companyId,
    companyId,
    userId: originalAdminId,
    newValue: {
      superAdminId: originalAdminId,
      companyId,
      startedAt: supportStartedAt ?? null,
      timestamp: endedAt.toISOString(),
    },
  })

  return {
    endedAt,
  }
}
