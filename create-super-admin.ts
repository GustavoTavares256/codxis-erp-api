import bcrypt from 'bcryptjs'
import { prisma } from './src/shared/database/prisma'

async function main() {
  const password = await bcrypt.hash('Codexis1020', 10)

  const user = await prisma.user.upsert({
    where: {
      email: 'suporte.codxis@gmail.com',
    },
    update: {
      role: 'SUPER_ADMIN',
      companyId: null,
      password,
    },
    create: {
      name: 'Gustavo Super Admin',
      email: 'suporte.codxis@gmail.com',
      password,
      role: 'SUPER_ADMIN',
      companyId: null,
    },
  })

  console.log('SUPER_ADMIN criado/atualizado:', user.email)
}

main()