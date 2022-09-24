import bcrypt from 'bcrypt'
import { router } from '@/utils/router'
import { validate, zParse } from '@/utils/validate'
import { signupSchema } from '@/validators/auth'
import { prisma } from '@/utils/prisma'
import { createTokens } from '@/utils/tokens'

router.post('/signup', validate(signupSchema), async (req, res) => {
  console.log(req.body, 'body')
  const { body } = await zParse(signupSchema, req)

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

    return
  } catch (e) {
    res.status(500).send({
      success: false,
      error: { message: e },
    })
    return
  }
})

export default router
