import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '../../use-cases/create-gym'
import { InMemoryGymsRepositorys } from '@/repositories/inMemory/in-memory-gyms-repository'

describe('Create Gym Use case', () => {
  let gymUseCase: InMemoryGymsRepositorys
  let sut: CreateGymUseCase
  beforeEach(() => {
    gymUseCase = new InMemoryGymsRepositorys()
    sut = new CreateGymUseCase(gymUseCase)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Node Gym',
      latitude: -17.5303418,
      longitude: -39.7034046,
      description: null,
      phone: null,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
