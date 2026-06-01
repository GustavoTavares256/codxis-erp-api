import { prisma } from '../../../shared/database/prisma'

export async function deleteProductService(
  companyId: string,
  productId: string,
) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      companyId,
    },
  })

  if (!product) {
    throw new Error('Produto não encontrado')
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  })

  return {
    message: 'Produto removido com sucesso',
  }
}