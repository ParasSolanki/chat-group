import { prisma } from '@/utils/prisma'

export async function getUserChannels(req, res) {
  const { id } = req.params

  try {
    const user = await prisma.user.findFirst({ where: { id } })
    if (!user) throw 'User not found'
  } catch (e) {
    return res.status(400).send({
      success: false,
      errors: {
        message: e,
      },
    })
  }

  try {
    const userChannels = await prisma.channel.findMany({
      where: { members: { some: { id } } },
      select: { id: true, name: true, description: true },
    })
    return res.status(200).send({ channels: userChannels })
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        message: error,
      },
    })
  }
}
