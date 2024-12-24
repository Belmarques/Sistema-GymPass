import { GetUserMatricsUseCase } from '../get-user-metrics'
import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMatricksUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new GetUserMatricsUseCase(checkInRepository)

  return useCase
}
