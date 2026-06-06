import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'

import { prisma } from '../../../shared/database/prisma'
import type { RegisterCompanyInput } from '../schemas/register-company.schema'

const TRIAL_DAYS = 14

export async function registerCompanyService(
  app: FastifyInstance,
  data: RegisterCompanyInput,
) {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('E-mail ja cadastrado')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  const licenseExpiresAt = new Date()
  licenseExpiresAt.setDate(licenseExpiresAt.getDate() + TRIAL_DAYS)

  const company = await prisma.company.create({
    data: {
      name: data.companyName,
      document: data.document,
      phone: data.phone,
      email: data.email,
      status: 'TRIAL',
      plan: 'FREE',
      licenseExpiresAt,
      users: {
        create: {
          name: data.responsibleName,
          email: data.email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      },
    },
    include: {
      users: true,
    },
  })

  const user = company.users[0]

  const token = app.jwt.sign({
    sub: user.id,
    role: user.role,
    companyId: company.id,
  })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: company.id,
      companyName: company.name,
    },
  }
}
