import type { CheckInsRepository } from '@/repositories/check-ins-repositorys'

interface GetUserMatricsUseCaseRequest {
  userId: string
}
interface GetUserMatricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMatricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMatricsUseCaseRequest): Promise<GetUserMatricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
