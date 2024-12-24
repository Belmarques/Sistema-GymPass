import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { CheckInUseCase } from '../checkin'
import { PrismaGymRepositorys } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const gymsRepositorys = new PrismaGymRepositorys()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepositorys)

  return useCase
}
