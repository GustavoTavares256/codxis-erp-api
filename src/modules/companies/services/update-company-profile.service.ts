import { prisma } from '../../../shared/database/prisma'
import type { UpdateCompanyProfileInput } from '../schemas'

export async function updateCompanyProfileService(
  companyId: string,
  data: UpdateCompanyProfileInput,
) {
  const companyExists = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
    },
  })

  if (!companyExists) {
    throw new Error('Empresa nao encontrada')
  }

  const company = await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      ...optionalText('name', data.name),
      ...optionalText('fantasyName', data.fantasyName),
      ...optionalText('document', data.document),
      ...optionalText('phone', data.phone),
      ...optionalText('email', data.email),
      ...optionalText('website', data.website),
      ...optionalText('address', data.address),
      ...optionalText('logoUrl', data.logoUrl),
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

  return company
}

function optionalText<Key extends keyof UpdateCompanyProfileInput>(
  key: Key,
  value: UpdateCompanyProfileInput[Key],
) {
  if (value === undefined) return {}

  return {
    [key]: value.trim() || null,
  }
}
