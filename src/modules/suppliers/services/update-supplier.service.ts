import { prisma } from '../../../shared/database/prisma'
import type { UpdateSupplierInput } from '../schemas/supplier.schema'

export async function updateSupplierService(
  companyId: string,
  supplierId: string,
  data: UpdateSupplierInput,
) {
  const supplierExists = await prisma.supplier.findFirst({
    where: {
      id: supplierId,
      companyId,
    },
  })

  if (!supplierExists) {
    throw new Error('Fornecedor não encontrado')
  }

  const supplier = await prisma.supplier.update({
    where: {
      id: supplierId,
    },
    data,
  })

  return supplier
}
