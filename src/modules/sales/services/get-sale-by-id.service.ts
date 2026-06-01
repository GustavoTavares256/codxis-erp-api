import { prisma } from '../../../shared/database/prisma'

export async function getSaleByIdService(
  companyId: string,
  saleId: string,
) {
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      companyId,
    },
    include: {
      customer: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!sale) {
    throw new Error('Venda não encontrada')
  }

  return sale
}