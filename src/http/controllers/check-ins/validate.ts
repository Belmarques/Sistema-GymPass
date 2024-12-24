import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidadeCheckinUseCase } from '@/use-cases/factories/make-validate-check-ins'
export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInSchema.parse(request.params)

  const createCheckins = makeValidadeCheckinUseCase()
  await createCheckins.execute({
    checkInId,
  })

  return reply.status(204).send()
}
