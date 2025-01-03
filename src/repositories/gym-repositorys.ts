import type { Gym, Prisma } from '@prisma/client'
export interface FindManyNearByParams {
  latitude: number
  longitude: number
}
export interface GymsRepositorys {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyGym(param: FindManyNearByParams): Promise<Gym[]>
}
