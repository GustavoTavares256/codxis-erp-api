import type { FastifyServerOptions } from 'fastify'

import { env } from './env'

export const loggerConfig: FastifyServerOptions['logger'] = {
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
}
