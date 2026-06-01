import { prisma } from '../../../shared/database/prisma'
import type { CreateProductInput } from '../schemas/product.schema'

export async function createProductService(
  companyId: string,
  data: CreateProductInput,
) {
  const product = await prisma.product.create({
    data: {
      ...data,
      companyId,
    },
  })

  return product
}