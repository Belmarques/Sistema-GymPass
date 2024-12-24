import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepositorys } from '@/repositories/inMemory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '../../use-cases/get-user-profile'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-errors'

describe('Get User Profile Use case', () => {
  let userRepository: InMemoryUsersRepositorys
  let sut: GetUserProfileUseCase
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositorys()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should not be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'Juninho',
      email: 'Juninho@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Juninho')
  })
  it('should not be able to get user profile with wrong id', async () => {
    await userRepository.create({
      email: 'Gabriel-0701@example.com',
      name: 'Gabriel',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: 'non-exist-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
