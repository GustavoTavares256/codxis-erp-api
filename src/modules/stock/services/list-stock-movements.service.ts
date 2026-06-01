import { prisma } from '../../../shared/database/prisma'

export async function listStockMovementsService(companyId: string) {
  const movements = await prisma.stockMovement.findMany({
    where: {
      companyId,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return movements
}