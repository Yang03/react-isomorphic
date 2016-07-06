export default () => async (ctx, next) => {
    await next()
	if (ctx.status === 404) {
		ctx.throw('url not found', 404)
	}
}
