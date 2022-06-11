import { router } from '@/utils/router'
import { getChannels } from '@/controllers/ChannelController'

router.get('/channels', getChannels)

export default router
