import type { Gym } from '@prisma/client'
import type { GymsRepositorys } from '@/repositories/gym-repositorys'
interface CreateGymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepositorys) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    })
    return { gym }
  }
}
