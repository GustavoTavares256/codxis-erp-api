import bcrypt from 'bcryptjs'
import { prisma } from '../../../shared/database/prisma'
import { RegisterInput } from '../schemas/register.schema'

export async function registerService(data: RegisterInput) {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: data.userEmail,
    },
  })

  if (userAlreadyExists) {
    throw new Error('E-mail já cadastrado')
  }

  const hashedPassword = await bcrypt.hash(data.userPassword, 10)

  const company = await prisma.company.create({
    data: {
      name: data.companyName,
      document: data.companyDocument,
      email: data.companyEmail,
      phone: data.companyPhone,
      users: {
        create: {
          name: data.userName,
          email: data.userEmail,
          password: hashedPassword,
          role: 'ADMIN',
        },
      },
    },
    include: {
      users: true,
    },
  })

  return {
    companyId: company.id,
    companyName: company.name,
    adminUser: {
      id: company.users[0].id,
      name: company.users[0].name,
      email: company.users[0].email,
      role: company.users[0].role,
    },
  }
}