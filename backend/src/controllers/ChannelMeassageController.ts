import { Request, Response } from 'express'
import { prisma } from '@/utils/prisma'

export async function getChannelMeassages(req: Request, res: Response) {
  const { id } = req.params

  try {
    const channel = await prisma.channel.findFirst({
      where: { id },
      select: { messages: true },
    })
    if (!channel) throw 'Channel not found'
    return res.status(200).send({
      success: true,
      messages: channel.messages,
    })
  } catch (e) {
    return res.status(400).send({
      success: false,
      errors: {
        message: e,
      },
    })
  }
}
