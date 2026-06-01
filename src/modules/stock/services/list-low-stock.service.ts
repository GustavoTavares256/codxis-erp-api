import { prisma } from '../../../shared/database/prisma'

export async function listLowStockService(companyId: string) {
  const products = await prisma.product.findMany({
    where: {
      companyId,
      isActive: true,
    },
    orderBy: {
      quantity: 'asc',
    },
  })

  return products.filter(
    (product) => product.quantity <= product.minimumStock,
  )
}