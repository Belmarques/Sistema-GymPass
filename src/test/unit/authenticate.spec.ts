import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepositorys } from '@/repositories/inMemory/in-memory-users-repository'
import { AuthenticateUseCase } from '../../use-cases/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../../use-cases/errors/invalid-credential-errors'

describe('Authenticate Use case', () => {
  let userRepository: InMemoryUsersRepositorys
  let sut: AuthenticateUseCase
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositorys()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'Gabriel-0701@example.com',
      name: 'Gabriel',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'Gabriel-0701@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'Gabriel-0701@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      email: 'Gabriel-0701@example.com',
      name: 'Gabriel',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'Gabriel-0701@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
