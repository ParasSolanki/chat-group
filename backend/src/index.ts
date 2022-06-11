import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/', async (_, res: Response) => {
  const users = await prisma.user.findMany({})
  res.status(200).send({ users })
})

app.get('/user/:id/channels', async (req: Request, res: Response) => {
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
})

app.get('/channels', async (_, res: Response) => {
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
  res.status(200).send({ channels })
})

app.get('/channel/:id/messages', async (req: Request, res: Response) => {
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
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
