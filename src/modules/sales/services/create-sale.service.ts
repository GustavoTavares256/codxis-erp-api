import { prisma } from '../../../shared/database/prisma'
import type { CreateSaleInput } from '../schemas/sale.schema'

export async function createSaleService(
  companyId: string,
  userId: string,
  data: CreateSaleInput,
) {
  const products = await prisma.product.findMany({
    where: {
      companyId,
      id: {
        in: data.items.map((item) => item.productId),
      },
    },
  })

  if (products.length !== data.items.length) {
    throw new Error('Um ou mais produtos não foram encontrados')
  }

  let totalAmount = 0

  for (const item of data.items) {
    const product = products.find((p) => p.id === item.productId)

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Estoque insuficiente para ${product.name}`)
    }

    totalAmount += Number(product.salePrice) * item.quantity
  }

  const sale = await prisma.$transaction(async (tx) => {
    const createdSale = await tx.sale.create({
      data: {
        companyId,
        userId,
        customerId: data.customerId,
        paymentMethod: data.paymentMethod,
        totalAmount,
        items: {
          create: data.items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!

            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: product.salePrice,
              subtotal: Number(product.salePrice) * item.quantity,
            }
          }),
        },
      },
      include: {
        items: true,
      },
    })

    for (const item of data.items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      })

      await tx.stockMovement.create({
        data: {
          type: 'OUT',
          quantity: item.quantity,
          reason: 'Venda realizada',
          productId: item.productId,
          companyId,
        },
      })
    }

    return createdSale
  })

  return sale
}