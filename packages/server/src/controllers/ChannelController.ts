import { prisma } from '@/utils/prisma'

export async function getChannels(_: any, res) {
  const channels = await prisma.channel.findMany({
    include: {
      author: {
        select: {
          firstName: true,
          id: true,
          lastName: true,
          email: true,
        },
      },
    },
  })
  return res.status(200).send({ channels })
}
