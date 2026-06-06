import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: '127.0.0.1',
  port: 3306,
  user: 'codxis_user',
  password: 'codxis123',
  database: 'codxis_erp',
  allowPublicKeyRetrieval: true,
})

export const prisma = new PrismaClient({
  adapter,
})
