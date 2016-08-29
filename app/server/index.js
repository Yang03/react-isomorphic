import Koa from 'koa'
import json from 'koa-json'
import serve from 'koa-static'
import compose from 'koa-compose'
import convert from 'koa-convert'
import favicon from 'koa-favicon'
import views from 'koa-views'
import router from './routes'
import bodyParser from 'koa-bodyparser'
import notFound from './middlewares/notFound'
import devConfig from '../client/webpack.dev'
import webpack from 'webpack'
import path from 'path'
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'

const dev = process.env.NODE_ENV != 'production'

const app = new Koa()
console.log('---->' + process.env.NODE_ENV)
console.log(process.env.IS_SEREVER)
const templatePath = __dirname + '/template/'
//console.log(templatePath);
 app.use(views(templatePath, { extension: 'ejs' }))

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

app.use(serve(path.resolve(__dirname ,  '../client')))

const middlewares = convert.compose([
	//favicon(__dirname + '/favicon.ico'),
	bodyParser({formLimit: '5mb'}),
	notFound(),
	json(),
	router,
	//router.allowedMethods()
])


app.use(middlewares)

app.listen('3000', () => console.log('server started 3000'))
export default app
