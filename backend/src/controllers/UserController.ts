import { Response } from 'express'
import { prisma } from '@/utils/prisma'

export async function getUsers(_: any, res: Response) {
  const users = await prisma.user.findMany({})
  return res.status(200).send({ users })
}
