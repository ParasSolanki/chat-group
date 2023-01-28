import bcrypt from 'bcrypt'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { zParse } from '@/utils/validate'
import { signupBodySchema } from '@/validators/auth'
import { prisma } from '@/utils/prisma'
import { createTokens } from '@/utils/tokens'
import { z } from 'zod'

async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/signup',
    {
      schema: { body: signupBodySchema },
      validatorCompiler: ({ schema }) => {
        return (data) => {
          if (schema.body) {
            const err = schema.body.safeParse(data)

            console.log(err.success)
          }
        }
      },
    },
    async (request, reply) => {
      const hasUser = await prisma.user.findUnique({
        where: { email: body.email },
      })

      if (hasUser) {
        return res.status(409).send({
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

        res.cookie('token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).send({
          success: true,
          accessToken,
        })
      } catch (e) {
        res.status(500).send({
          success: false,
          error: { message: e },
        })
      }
    }
  )
}

export default authRoutes
