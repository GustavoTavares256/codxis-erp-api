import type { FastifyInstance } from 'fastify'

import { registerAuthModule } from './auth/routes'
import { registerCategoriesModule } from './categories/routes'
import { registerCompaniesModule } from './companies/routes'
import { registerCustomersModule } from './customers/routes'
import { registerFinancialModule } from './financial/routes'
import { registerProductsModule } from './products/routes'
import { registerSalesModule } from './sales/routes'
import { registerStockModule } from './stock/routes'
import { registerSuppliersModule } from './suppliers/routes'
import { registerUsersModule } from './users/routes'

export function registerModules(app: FastifyInstance) {
  registerAuthModule(app)
  registerCompaniesModule(app)
  registerUsersModule(app)
  registerProductsModule(app)
  registerCategoriesModule(app)
  registerSuppliersModule(app)
  registerCustomersModule(app)
  registerStockModule(app)
  registerSalesModule(app)
  registerFinancialModule(app)
}
