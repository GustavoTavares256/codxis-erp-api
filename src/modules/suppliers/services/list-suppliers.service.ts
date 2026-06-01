import { prisma } from '../../../shared/database/prisma'

export async function listSuppliersService(companyId: string) {
  return prisma.supplier.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
