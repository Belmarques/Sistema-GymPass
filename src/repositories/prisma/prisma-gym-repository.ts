import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepositorys, type FindManyNearByParams } from '../gym-repositorys'

export class PrismaGymRepositorys implements GymsRepositorys {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        phone: data.phone,
      },
    })
    return gym
  }

  async findById(id: string) {
    const findId = await prisma.gym.findFirst({
      where: {
        id,
      },
    })
    return findId
  }

  async searchMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gym
  }

  async findManyGym({ latitude, longitude }: FindManyNearByParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
     SELECT * from gyms
     WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
