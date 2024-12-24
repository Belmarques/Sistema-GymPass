import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym'
export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)

  const searchGym = makeSearchGymUseCase()
  const gym = await searchGym.execute({
    query,
    page,
  })

  return reply.status(200).send({ gym })
}
