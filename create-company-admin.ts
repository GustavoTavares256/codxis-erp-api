import bcrypt from 'bcryptjs'
import { prisma } from './src/shared/database/prisma'

const CODXIS_COMPANY_ID = 'd1807352-5bd7-4c3b-a9a2-605957f14b2a'

async function main() {
  const password = await bcrypt.hash('Codexis1020', 10)

  await prisma.company.upsert({
    where: {
      id: CODXIS_COMPANY_ID,
    },
    update: {
      name: 'CODXIS ERP',
    },
    create: {
      id: CODXIS_COMPANY_ID,
      name: 'CODXIS ERP',
      status: 'ACTIVE',
      plan: 'ENTERPRISE',
    },
  })

  const user = await prisma.user.upsert({
    where: {
      email: 'suporte.codxis@gmail.com',
    },
    update: {
      name: 'Suporte CodXis',
      password,
      role: 'ADMIN',
      companyId: CODXIS_COMPANY_ID,
    },
    create: {
      name: 'Suporte CodXis',
      email: 'suporte.codxis@gmail.com',
      password,
      role: 'ADMIN',
      companyId: CODXIS_COMPANY_ID,
    },
  })

  console.log('ADMIN da empresa criado/atualizado:', user.email)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
