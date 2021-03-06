import { router } from '@/utils/router'
import { getChannelMeassages } from '@/controllers/ChannelMeassageController'

router.get('/channel/:id/messages', getChannelMeassages)

export default router
