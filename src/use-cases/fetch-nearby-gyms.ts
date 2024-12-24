import type { Gym } from '@prisma/client'
import type { GymsRepositorys } from '@/repositories/gym-repositorys'
interface FeatchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface FeatchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FeatchNearbyGymUseCase {
  constructor(private gymsRepository: GymsRepositorys) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearbyGymUseCaseRequest): Promise<FeatchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyGym({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
