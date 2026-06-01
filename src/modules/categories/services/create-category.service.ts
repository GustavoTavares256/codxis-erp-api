import { prisma } from '../../../shared/database/prisma'
import type { CreateCategoryInput } from '../schemas/category.schema'

export async function createCategoryService(
  companyId: string,
  data: CreateCategoryInput,
) {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      companyId,
    },
  })

  return category
}