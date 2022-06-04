import express, { Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/', async (_, res: Response) => {
  const users = await prisma.user.findMany({})
  res.status(200).send({ users })
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
