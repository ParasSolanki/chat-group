import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'

import ZodValidator from './plugins/zod-validator'

import AuthRoutes from '@/routes/AuthRoutes'

const fastify = Fastify({ logger: true })
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000

fastify.register(cors, {
  hook: 'preHandler',
  origin: '*',
  credentials: true,
  strictPreflight: true,
  methods: ['GET', 'POST'],
})
fastify.register(cookie, {
  secret: 'my-secret',
  hook: 'onRequest',
})
fastify.register(ZodValidator)

fastify.register(AuthRoutes, { prefix: '/api' })

/** RUN the server */
const start = async () => {
  try {
    await fastify.listen({ port: PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
