import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFeatchNearbyGymUseCase } from '@/use-cases/factories/make-fetch-nearby-gym'
export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const nearbyGym = makeFeatchNearbyGymUseCase()
  const { gyms } = await nearbyGym.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
