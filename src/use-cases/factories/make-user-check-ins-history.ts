import { FetchUserCheckinsHistoryUseCase } from '../fetch-user-check-ins-historys'
import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeFetchUserCheckinHistoryUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new FetchUserCheckinsHistoryUseCase(checkInRepository)

  return useCase
}
