import { prisma } from '../../../shared/database/prisma'

export async function getCompanyProfileService(companyId: string) {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
      name: true,
      fantasyName: true,
      document: true,
      phone: true,
      email: true,
      website: true,
      address: true,
      logoUrl: true,
      plan: true,
      status: true,
      licenseExpiresAt: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!company) {
    throw new Error('Empresa nao encontrada')
  }

  return company
}
