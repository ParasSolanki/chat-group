import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import {
  ChannelMeassageRoutes,
  UserRoutes,
  ChannelRoutes,
  UserChannelsRoutes,
  AuthRoutes,
} from '@/routes'

const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// Routes
app.use('/api', AuthRoutes) // auth
app.use('/api', UserRoutes) // user
app.use('/api', ChannelRoutes) // channel
app.use('/api', UserChannelsRoutes) // user channels
app.use('/api', ChannelMeassageRoutes) // channel meassages

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
