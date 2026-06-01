import { prisma } from '../../../shared/database/prisma'
import type { CreateCustomerInput } from '../schemas/customer.schema'

export async function createCustomerService(
  companyId: string,
  data: CreateCustomerInput,
) {
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      document: data.document,
      email: data.email,
      phone: data.phone,
      companyId,
    },
  })

  return customer
}
