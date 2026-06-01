import { prisma } from '../../../shared/database/prisma'

export async function deleteSupplierService(
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

  await prisma.supplier.delete({
    where: {
      id: supplierId,
    },
  })

  return {
    message: 'Fornecedor removido com sucesso',
  }
}
