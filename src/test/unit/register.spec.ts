import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../../use-cases/register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepositorys } from '@/repositories/inMemory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../../use-cases/errors/users-already-exists'

describe('Register Use case', () => {
  let prismaUser: InMemoryUsersRepositorys
  let sut: RegisterUseCase
  beforeEach(() => {
    prismaUser = new InMemoryUsersRepositorys()
    sut = new RegisterUseCase(prismaUser)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Gabriel',
      email: 'Gabriel-0701@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Gabriel',
      email: 'Gabriel-0701@example.com',
      password: '123456',
    })
    const isPasswordCorrectlyHash = await compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('should be not be able to register with same emial twice', async () => {
    const email = 'Gabriel-0701@example.com'
    await sut.execute({
      name: 'Gabriel',
      email,
      password: '123456',
    })
    await expect(() =>
      sut.execute({
        name: 'Gabriel',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
