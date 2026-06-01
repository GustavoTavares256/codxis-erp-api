import { prisma } from '../../../shared/database/prisma'

export async function dashboardService(companyId: string) {
  const [
    productsCount,
    customersCount,
    salesCount,
    lowStockProducts,
    financialTransactions,
  ] = await Promise.all([
    prisma.product.count({
      where: {
        companyId,
        isActive: true,
      },
    }),

    prisma.customer.count({
      where: {
        companyId,
      },
    }),

    prisma.sale.count({
      where: {
        companyId,
      },
    }),

    prisma.product.findMany({
      where: {
        companyId,
        isActive: true,
      },
    }),

    prisma.financialTransaction.findMany({
      where: {
        companyId,
      },
    }),
  ])

  const lowStockCount = lowStockProducts.filter(
    (product) => product.quantity <= product.minimumStock,
  ).length

  const revenue = financialTransactions
    .filter((transaction) => transaction.type === 'INCOME')
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0)

  const expenses = financialTransactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0)

  return {
    products: productsCount,
    customers: customersCount,
    sales: salesCount,
    revenue,
    expenses,
    profit: revenue - expenses,
    lowStock: lowStockCount,
  }
}