import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { signupBodySchema } from '@/validators/auth'
import { prisma } from '@/utils/prisma'
import { createTokens } from '@/utils/tokens'

async function authRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider().route({
    url: '/signup',
    method: 'POST',
    schema: {
      body: signupBodySchema,
    },
    handler: async (request, reply) => {
      const { body } = request

      const hasUser = await prisma.user.findUnique({
        where: { email: body.email },
      })

      if (hasUser) {
        return reply.status(409).send({
          success: false,
          error: { message: 'User with email already exists' },
        })
      }

      try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)

        const user = await prisma.user.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: {
              create: {
                hash: hashedPassword,
              },
            },
          },
        })

        const [accessToken, refreshToken] = await createTokens(user)

        // store in session
        await prisma.session.create({
          data: {
            accessToken,
            refreshToken,
            userId: user.id,
            expires: new Date(),
          },
        })

        // reply.cookie('token', refreshToken, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        //   maxAge: 24 * 60 * 60 * 1000,
        // })

        reply.status(200).send({
          success: true,
          accessToken,
        })
      } catch (e) {
        reply.status(500).send({
          success: false,
          error: { message: e },
        })
      }
    },
  })
}

export default authRoutes
