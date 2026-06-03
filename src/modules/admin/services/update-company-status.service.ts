import { prisma } from '../../../shared/database/prisma'
import { CompanyStatus } from '@prisma/client'

export async function updateCompanyStatusService(
  companyId: string,
  status: CompanyStatus,
) {
  return prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      status,
    },
  })
}