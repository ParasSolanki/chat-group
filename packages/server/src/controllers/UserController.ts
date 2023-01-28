import { prisma } from '@/utils/prisma'

export async function getUsers(_, res) {
  const users = await prisma.user.findMany({})
  return res.status(200).send({ users })
}
