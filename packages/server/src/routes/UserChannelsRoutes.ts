import { router } from '@/utils/router'
import { getUserChannels } from '@/controllers/UserChannelsController'

router.get('/user/:id/channels', getUserChannels)

export default router
