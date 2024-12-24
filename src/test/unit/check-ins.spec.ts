import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepositorys } from '@/repositories/inMemory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/checkin'
import { InMemoryGymsRepositorys } from '@/repositories/inMemory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckinsError } from '@/use-cases/errors/max-number-of-checkin-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'

describe('CheckIns Use case', () => {
  let checkInsRepository: InMemoryCheckInsRepositorys
  let sut: CheckInUseCase
  let gymsReposytorys: InMemoryGymsRepositorys
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositorys()
    gymsReposytorys = new InMemoryGymsRepositorys()
    sut = new CheckInUseCase(checkInsRepository, gymsReposytorys)
    await gymsReposytorys.create({
      id: 'gym-01',
      title: 'Node Gym',
      latitude: -17.5303418,
      longitude: -39.7034046,
      description: null,
      phone: null,
    })
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.5303418,
      userLongitude: -39.7034046,
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.5303418,
      userLongitude: -39.7034046,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -17.5303418,
        userLongitude: -39.7034046,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.5303418,
      userLongitude: -39.7034046,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.5303418,
      userLongitude: -39.7034046,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsReposytorys.items.push({
      id: 'gym-02',
      title: 'Academia Java',
      description: '',
      phone: '',
      latitude: new Decimal(-17.5534896),
      longitude: new Decimal(-39.7469876),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -17.5303418,
        userLongitude: -39.7034046,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
