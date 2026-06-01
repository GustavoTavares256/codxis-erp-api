import { prisma } from '../../../shared/database/prisma'

export async function getCustomerByIdService(
  companyId: string,
  customerId: string,
) {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      companyId,
    },
  })

  if (!customer) {
    throw new Error('Cliente não encontrado')
  }

  return customer
}
