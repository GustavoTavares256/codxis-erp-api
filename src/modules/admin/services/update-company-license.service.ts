import {
  AuditLogAction,
} from '@prisma/client'

import { prisma } from '../../../shared/database/prisma'

import { createAuditLogService } from './create-audit-log.service'

export async function updateCompanyLicenseService(
  companyId: string,
  licenseExpiresAt: Date,
  userId: string,
) {
  return prisma.$transaction(async (transaction) => {
    const company = await transaction.company.findUniqueOrThrow({
      where: {
        id: companyId,
      },
    })

    const updatedCompany = await transaction.company.update({
      where: {
        id: companyId,
      },
      data: {
        licenseExpiresAt,
      },
    })

    await createAuditLogService(
      {
        action: AuditLogAction.COMPANY_LICENSE_UPDATED,
        entity: 'Company',
        entityId: companyId,
        companyId,
        userId,
        oldValue: {
          licenseExpiresAt: company.licenseExpiresAt?.toISOString() ?? null,
        },
        newValue: {
          licenseExpiresAt: updatedCompany.licenseExpiresAt?.toISOString() ?? null,
        },
      },
      transaction,
    )

    return updatedCompany
  })
}
