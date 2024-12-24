import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckinsSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckinsSchema.parse(request.body)
  const { gymId } = createCheckinsParamsSchema.parse(request.params)

  const createCheckins = makeCheckInUseCase()
  await createCheckins.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
