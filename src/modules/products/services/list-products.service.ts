import { prisma } from '../../../shared/database/prisma'

export async function listProductsService(companyId: string) {
  const products = await prisma.product.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return products
}