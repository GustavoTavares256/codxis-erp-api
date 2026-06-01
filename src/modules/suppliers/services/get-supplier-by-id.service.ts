import { prisma } from '../../../shared/database/prisma'

export async function getSupplierByIdService(
  companyId: string,
  supplierId: string,
) {
  const supplier = await prisma.supplier.findFirst({
    where: {
      id: supplierId,
      companyId,
    },
  })

  if (!supplier) {
    throw new Error('Fornecedor não encontrado')
  }

  return supplier
}
