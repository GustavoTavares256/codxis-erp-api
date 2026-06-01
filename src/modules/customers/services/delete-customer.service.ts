import { prisma } from '../../../shared/database/prisma'

export async function deleteCustomerService(
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

  await prisma.customer.delete({
    where: {
      id: customerId,
    },
  })

  return {
    message: 'Cliente removido com sucesso',
  }
}
