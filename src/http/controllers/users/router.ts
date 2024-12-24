import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { refresh } from './refresh'

export async function usersRouter(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/login', authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.patch('/token/refresh', refresh)
}
