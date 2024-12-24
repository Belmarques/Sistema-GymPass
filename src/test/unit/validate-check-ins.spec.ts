import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepositorys } from '@/repositories/inMemory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-errors'

describe('Validate CheckIns Use case', () => {
  let checkInsRepository: InMemoryCheckInsRepositorys
  let sut: ValidateCheckInUseCase
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositorys()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent checkin', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'createdCheckIn.id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const twentyOneMinutesInMS = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMS)
    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
