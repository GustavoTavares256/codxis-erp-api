import { prisma } from '../../../shared/database/prisma'

export async function listCompaniesService() {
  return prisma.company.findMany({
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}