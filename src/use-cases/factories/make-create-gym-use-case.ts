import { PrismaGymRepositorys } from '@/repositories/prisma/prisma-gym-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepositorys = new PrismaGymRepositorys()
  const useCase = new CreateGymUseCase(gymsRepositorys)

  return useCase
}
