import { prisma } from '../../../shared/database/prisma'

export async function financialSummaryService(
  companyId: string,
) {
  const transactions =
    await prisma.financialTransaction.findMany({
      where: {
        companyId,
      },
    })

  const income = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const expense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + Number(t.amount), 0)

  return {
    income,
    expense,
    profit: income - expense,
  }
}