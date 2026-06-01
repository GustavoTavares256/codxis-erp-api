import { prisma } from '../../../shared/database/prisma'
import type { UpdateCustomerInput } from '../schemas/customer.schema'

export async function updateCustomerService(
  companyId: string,
  customerId: string,
  data: UpdateCustomerInput,
) {
  const customerExists = await prisma.customer.findFirst({
    where: {
      id: customerId,
      companyId,
    },
  })

  if (!customerExists) {
    throw new Error('Cliente não encontrado')
  }

  const customer = await prisma.customer.update({
    where: {
      id: customerId,
    },
    data,
  })

  return customer
}
