import { env } from './config/env'
import { app } from './app'

async function start() {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    })

    app.log.info(`Server running on ${env.HOST}:${env.PORT}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
