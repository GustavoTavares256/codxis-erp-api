import { prisma } from '../../../shared/database/prisma'

export async function listCategoriesService(companyId: string) {
  return prisma.category.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}