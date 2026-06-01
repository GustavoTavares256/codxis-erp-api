import { prisma } from '../../../shared/database/prisma'

export async function listCustomersService(companyId: string) {
  return prisma.customer.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
