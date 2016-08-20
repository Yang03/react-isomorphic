import Router from 'koa-router'
import { categoryAll } from '../api'
const router = new Router()
router.prefix('/api')

router.get('/categoryAll', categoryAll)

export default router
