import { PrismaGymRepositorys } from '@/repositories/prisma/prisma-gym-repository'
import { SearchGymsUseCase } from '../search-gym'

export function makeSearchGymUseCase() {
  const gymsRepositorys = new PrismaGymRepositorys()
  const useCase = new SearchGymsUseCase(gymsRepositorys)

  return useCase
}
