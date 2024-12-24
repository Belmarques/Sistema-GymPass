import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepositorys } from '@/repositories/inMemory/in-memory-check-ins-repository'
import { GetUserMatricsUseCase } from '@/use-cases/get-user-metrics'

describe('Get Use Metrics Use case', () => {
  let checkInsRepository: InMemoryCheckInsRepositorys
  let sut: GetUserMatricsUseCase
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositorys()
    sut = new GetUserMatricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })
    expect(checkInsCount).toBe(2)
  })
})
