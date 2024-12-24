import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepositorys } from '@/repositories/inMemory/in-memory-gyms-repository'
import { FeatchNearbyGymUseCase } from '@/use-cases/fetch-nearby-gyms'

describe(' Featch Nearby Use Case', () => {
  let gymsRepository: InMemoryGymsRepositorys
  let sut: FeatchNearbyGymUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositorys()
    sut = new FeatchNearbyGymUseCase(gymsRepository)
  })
  it('should be able to fetch nearby gym', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -17.5268804,
      longitude: -39.7039342,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Far Gym' })])
  })
})
