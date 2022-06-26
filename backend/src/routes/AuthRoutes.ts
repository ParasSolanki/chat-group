import { router } from '@/utils/router'
import { validate, zParse } from '@/utils/validate'
import { signupSchema } from '@/validators/auth'
import { prisma } from '@/utils/prisma'

router.post('/signup', validate(signupSchema), async (req, res) => {
  const { body: user } = await zParse(signupSchema, req)

  const hasUser = await prisma.user.findUnique({
    where: { email: user.email },
  })

  if (hasUser) {
    return res.status(400).send({
      success: false,
      error: { message: 'User with email already exists' },
    })
  }
})

export default router
