import bcrypt from 'bcryptjs'
import { prisma } from './src/shared/database/prisma'

async function main() {
  const password = await bcrypt.hash('Codexis1020', 10)

  const companyId = 'd1807352-5bd7-4c3b-a9a2-605957f14b2a'

  const user = await prisma.user.upsert({
    where: {
      email: 'admin.empresa@codxis.com',
    },
    update: {
      name: 'Admin Empresa',
      password,
      role: 'ADMIN',
      companyId,
    },
    create: {
      name: 'Admin Empresa',
      email: 'admin.empresa@codxis.com',
      password,
      role: 'ADMIN',
      companyId,
    },
  })

  console.log('ADMIN da empresa criado:', user.email)
}

main()  