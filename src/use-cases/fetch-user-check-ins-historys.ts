import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repositorys'

interface FetchUserCheckinsHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckinsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckinsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinsHistoryUseCaseRequest): Promise<FetchUserCheckinsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
