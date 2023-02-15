import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { loginBodySchema, signupBodySchema } from '@/validators/auth'
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

      try {
        const user = await prisma.user.findUnique({
          where: { email: body.email },
        })

        if (user) {
          reply.status(409).send({
            success: false,
            error: { message: 'User with email already exists' },
          })
          return
        }
      } catch (e) {
        reply.status(500).send({
          success: false,
          error: { message: 'Something went wrong' },
        })
        return
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

        reply.cookie('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
          signed: true,
        })
        reply.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 59 * 60 * 1000,
          signed: true,
        })

        reply.status(200).send({
          success: true,
          user: user,
        })
      } catch (e) {
        reply.status(500).send({
          success: false,
          error: { message: e },
        })
      }
    },
  })

  // Login
  fastify.withTypeProvider().route({
    url: '/login',
    method: 'POST',
    schema: {
      body: loginBodySchema,
    },
    handler: async (request, reply) => {
      const { email, password } = request.body

      try {
        const user = await prisma.user.findUnique({
          where: { email: email },
          include: {
            password: true,
          },
        })

        if (!user || !user.password) {
          reply.status(400).send({
            success: false,
            error: { message: 'User does not exists' },
          })
          return
        }

        const isMatch = await bcrypt.compare(password, user.password.hash)

        if (!isMatch) {
          reply.status(400).send({
            success: false,
            error: { message: 'User email or password is wrong' },
          })
          return
        }

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

        reply.cookie('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
          signed: true,
        })
        reply.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 59 * 60 * 1000,
          signed: true,
        })

        const userJson = { ...user, password: undefined }

        reply.status(200).send({
          success: true,
          user: userJson,
        })
      } catch (e) {
        reply.status(500).send({
          success: false,
          error: { message: 'Something went wrong' },
        })
        return
      }
    },
  })
}

export default authRoutes
