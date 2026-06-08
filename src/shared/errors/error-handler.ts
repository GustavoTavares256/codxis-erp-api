import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { AppError } from './app-error'

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  console.error(error)

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Dados invalidos',
      errors: error.issues,
    })
  }

  return reply.status(500).send({
    message: error.message,
  })
}
