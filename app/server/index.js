import Koa from 'koa'
import json from 'koa-json'
import serve from 'koa-static'
import Router from 'koa-router'
import compose from 'koa-compose'
import convert from 'koa-convert'
import favicon from 'koa-favicon'
import { categoryAll } from './api'
import bodyParser from 'koa-bodyparser'
import notFound from './middlewares/notFound'
import devConfig from '../client/webpack.dev'
import webpack from 'webpack'
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'

const dev = process.env.NODE_ENV != 'production'

const app = new Koa()
const router = Router()

const compile = webpack(devConfig)
if (dev) {
	app.use(devMiddleware(compile, {
		noInfo: true,
		reload: true,
		publicPath: devConfig.output.publicPath,
		stats: {
			colors: true
		}
}))

app.use(hotMiddleware(compile, {
	log: console.log,
	path: '/dist/__webpack_hmr',
	heartbeat: 5000
	}))
}

app.use(serve(__dirname + '../../client/'))

router
	.get('/categoryAll', categoryAll)

const middlewares = compose([
	favicon(__dirname + '/favicon.ico'),
	bodyParser({formLimit: '5mb'}),
	notFound(),
	json(),
	router.routes(),
	router.allowedMethods()
])


app.use(middlewares)

app.listen('3000', () => console.log('server started 3000'))
export default app
