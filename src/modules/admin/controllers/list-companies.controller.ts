import type { FastifyReply, FastifyRequest } from 'fastify'

import { listCompaniesService } from '../services/list-companies.service'

export async function listCompaniesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const companies = await listCompaniesService()

  return reply.status(200).send(companies)
}