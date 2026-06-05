import {
  AuditLogAction,
  CompanyPlan,
} from '@prisma/client'

import { prisma } from '../../../shared/database/prisma'

import { createAuditLogService } from './create-audit-log.service'

export async function updateCompanyPlanService(
  companyId: string,
  plan: CompanyPlan,
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
        plan,
      },
    })

    await createAuditLogService(
      {
        action: AuditLogAction.COMPANY_PLAN_UPDATED,
        entity: 'Company',
        entityId: companyId,
        companyId,
        userId,
        oldValue: {
          plan: company.plan,
        },
        newValue: {
          plan: updatedCompany.plan,
        },
      },
      transaction,
    )

    return updatedCompany
  })
}
