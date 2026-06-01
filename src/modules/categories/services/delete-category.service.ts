import { prisma } from '../../../shared/database/prisma'

export async function deleteCategoryService(
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

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  })

  return {
    message: 'Categoria removida com sucesso',
  }
}
