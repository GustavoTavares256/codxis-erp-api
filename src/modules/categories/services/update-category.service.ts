import { prisma } from '../../../shared/database/prisma'
import type { UpdateCategoryInput } from '../schemas/category.schema'

export async function updateCategoryService(
  companyId: string,
  categoryId: string,
  data: UpdateCategoryInput,
) {
  const categoryExists = await prisma.category.findFirst({
    where: {
      id: categoryId,
      companyId,
    },
  })

  if (!categoryExists) {
    throw new Error('Categoria não encontrada')
  }

  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  })

  return category
}
