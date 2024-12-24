import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepositorys } from '@/repositories/inMemory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/search-gym'

describe(' Search gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepositorys
  let sut: SearchGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositorys()
    sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })
})
