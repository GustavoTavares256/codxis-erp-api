import { prisma } from '../../../shared/database/prisma'

export async function listFinancialService(
  companyId: string,
) {
  return prisma.financialTransaction.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}