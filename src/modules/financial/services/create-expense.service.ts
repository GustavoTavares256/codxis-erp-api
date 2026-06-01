import { prisma } from '../../../shared/database/prisma'
import type { CreateExpenseInput } from '../schemas/financial.schema'

export async function createExpenseService(
  companyId: string,
  data: CreateExpenseInput,
) {
  return prisma.financialTransaction.create({
    data: {
      companyId,
      description: data.description,
      amount: data.amount,
      type: 'EXPENSE',
      status: 'PENDING',
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  })
}