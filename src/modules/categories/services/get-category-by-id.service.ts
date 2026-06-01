import { prisma } from '../../../shared/database/prisma'

export async function getCategoryByIdService(
  companyId: string,
  categoryId: string,
) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      companyId,
    },
  })

  if (!category) {
    throw new Error('Categoria não encontrada')
  }

  return category
}
