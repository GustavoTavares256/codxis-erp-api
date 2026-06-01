import { prisma } from '../../../shared/database/prisma'
import type { CreateSupplierInput } from '../schemas/supplier.schema'

export async function createSupplierService(
  companyId: string,
  data: CreateSupplierInput,
) {
  const supplier = await prisma.supplier.create({
    data: {
      name: data.name,
      document: data.document,
      email: data.email,
      phone: data.phone,
      companyId,
    },
  })

  return supplier
}
