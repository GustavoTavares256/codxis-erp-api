import bcrypt from 'bcryptjs'
import { prisma } from './src/shared/database/prisma'

async function main() {
  const password = await bcrypt.hash('Codexis1020', 10)

  const user = await prisma.user.upsert({
    where: {
      email: 'admin.codxis@gmail.com',
    },
    update: {
      name: 'CodXis Super Admin',
      role: 'SUPER_ADMIN',
      companyId: null,
      password,
    },
    create: {
      name: 'CodXis Super Admin',
      email: 'admin.codxis@gmail.com',
      password,
      role: 'SUPER_ADMIN',
      companyId: null,
    },
  })

  console.log('SUPER_ADMIN criado/atualizado:', user.email)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
