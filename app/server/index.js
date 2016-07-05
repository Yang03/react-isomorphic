import Koa from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'
import convert from 'koa-convert'
import json from 'koa-json'
import favicon from 'koa-favicon'
import bodyParser from 'koa-bodyparser'
import notFound from './middlewares/notFound'
import { categoryAll } from './api'


const app = new Koa()
const router = Router()

router
    .get('/categoryAll', categoryAll)

const middlewares = compose([
	// favicon(__dirname + '/favicon.ico'),
	// bodyParser({formLimit: '5mb'}),
    notFound(),
    json(),
    router.routes(),
	router.allowedMethods()
])

//app.use(json())
app.use(middlewares)

app.listen('3000', () => console.log('server started 3000'))
export default app
