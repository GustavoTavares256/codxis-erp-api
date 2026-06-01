import { prisma } from '../../../shared/database/prisma'

export async function listCategoriesService(companyId: string) {
  const categories = await prisma.category.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return categories
}