import { PrismaGymRepositorys } from '@/repositories/prisma/prisma-gym-repository'
import { FeatchNearbyGymUseCase } from '../fetch-nearby-gyms'

export function makeFeatchNearbyGymUseCase() {
  const gymsRepositorys = new PrismaGymRepositorys()
  const useCase = new FeatchNearbyGymUseCase(gymsRepositorys)

  return useCase
}
