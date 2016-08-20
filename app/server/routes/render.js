import { match } from 'react-router'
import renderCtrl from './serverRenderCtrl'
import routes from '../../client/src/routes'

function _match (location) {
  return new Promise((resolve, reject) => {
	match(location, (error, redirectLocation, renderProps) => {
	  if (error) {
		return reject(error)
	  }
	  resolve({redirectLocation, renderProps})
	})
  })
}
export default async (ctx, next) => {
  try {
	let location = ctx.url
	const { redirectLocation, renderProps } = await _match({ routes, location })

	if (redirectLocation) {
	  ctx.redirect(redirectLocation.pathname + redirectLocation.search)
	} else if (renderProps) {
	  await renderCtrl(ctx, next, renderProps)
	} else {
	  await next()
	}
  } catch (e) {
	console.error('Server-Render Error Occurs: %s', e.stack)
	await ctx.render('500', {
	  msg: ctx.app.env === 'development' ? e.message : false
	})
  }
 }
