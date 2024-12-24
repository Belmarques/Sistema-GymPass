import type { CheckIn, Prisma } from '@prisma/client'
import type { CheckInsRepository } from '../check-ins-repositorys'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = await prisma.checkIn.create({
      data,
    })
    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheday = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheday.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return checkin
  }

  async findManyByUserId(userId: string, page: number) {
    const userCheckin = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return userCheckin
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }
}
