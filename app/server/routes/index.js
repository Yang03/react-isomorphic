export default async (ctx, next) => {
	if (ctx.path.match(/^\/api/)) {
		let router = await require('./apiRouter').default
		return router.routes()(ctx, next)
	}
	await require('./render').default(ctx, next)
}
