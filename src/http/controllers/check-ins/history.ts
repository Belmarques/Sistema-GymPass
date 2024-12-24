import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckinHistoryUseCase } from '@/use-cases/factories/make-user-check-ins-history'
export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryQuerySchema.parse(request.query)

  const fetchUserCheckinHistory = makeFetchUserCheckinHistoryUseCase()
  const { checkIns } = await fetchUserCheckinHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
