import express from 'express'
import {
  ChannelMeassageRoutes,
  UserRoutes,
  ChannelRoutes,
  UserChannelsRoutes,
} from '@/routes'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// Routes
app.use('/api', UserRoutes) // user
app.use('/api', ChannelRoutes) // channel
app.use('/api', UserChannelsRoutes) // user channels
app.use('/api', ChannelMeassageRoutes) // channel meassages

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
