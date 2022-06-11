import { router } from '@/utils/router'
import { getUsers } from '@/controllers/UserController'

router.get('/users', getUsers)

export default router
