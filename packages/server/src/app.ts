import 'dotenv/config'
import Fastify from 'fastify'
import ZodValidator from './plugins/zod-validator'

// import {
//   // ChannelMeassageRoutes,
//   // UserRoutes,
//   // ChannelRoutes,
//   // UserChannelsRoutes,
//   // AuthRoutes,
// } from '@/routes'

const fastify = Fastify({ logger: true })
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000

fastify.register(ZodValidator, {
  handleValidatorError: (error) => ({ error }),
})

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
