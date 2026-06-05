import type { FastifyInstance } from 'fastify'
import type { AuditLogAction } from '@prisma/client'

import { prisma } from '../../../shared/database/prisma'
import { createAuditLogService } from './create-audit-log.service'

type ImpersonateCompanyData = {
  app: FastifyInstance
  companyId: string
  superAdminId: string
}

const SUPPORT_TOKEN_EXPIRES_IN = '30m'

export async function impersonateCompanyService({
  app,
  companyId,
  superAdminId,
}: ImpersonateCompanyData) {
  const company = await prisma.company.findUniqueOrThrow({
    where: {
      id: companyId,
    },
    select: {
      id: true,
      name: true,
    },
  })

  const superAdmin = await prisma.user.findUniqueOrThrow({
    where: {
      id: superAdminId,
    },
    select: {
      id: true,
      name: true,
      role: true,
    },
  })

  if (superAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Acesso permitido apenas para SUPER_ADMIN')
  }

  const supportStartedAt = new Date()

  await createAuditLogService({
    action: 'COMPANY_IMPERSONATION_STARTED' as AuditLogAction,
    entity: 'Company',
    entityId: company.id,
    companyId: company.id,
    userId: superAdmin.id,
    newValue: {
      superAdminId: superAdmin.id,
      companyId: company.id,
      timestamp: supportStartedAt.toISOString(),
    },
  })

  const token = app.jwt.sign(
    {
      sub: superAdmin.id,
      role: 'SUPPORT',
      companyId: company.id,
      companyName: company.name,
      originalAdminId: superAdmin.id,
      originalAdminName: superAdmin.name,
      impersonating: true,
      supportStartedAt: supportStartedAt.toISOString(),
    },
    {
      expiresIn: SUPPORT_TOKEN_EXPIRES_IN,
    },
  )

  return {
    token,
    companyId: company.id,
    companyName: company.name,
  }
}
