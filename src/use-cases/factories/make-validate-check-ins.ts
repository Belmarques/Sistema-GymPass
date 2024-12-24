import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidadeCheckinUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
