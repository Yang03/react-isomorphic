import React from 'react'
import { RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../../client/src/Store/configureStore'
const store = configureStore()

console.log(process.env.IS_BROWSER)
export default async (ctx, next, renderProps) => {
	const route = renderProps.routes[renderProps.routes.length - 1]
	var prefetchTasks = []
	for (let component of renderProps.components) {

		if (component && component.WrappedComponent && component.WrappedComponent.fetchData) {
			const _tasks = component.WrappedComponent.fetchData(store.getState(), store.dispatch)
			//console.log(Array.isArray(_tasks))
			if (Array.isArray(_tasks)) {
				prefetchTasks = prefetchTasks.concat(_tasks)

			} else if (_tasks.then) {
				prefetchTasks.push(_tasks)
			}
		}
  }
//console.log(prefetchTasks, '5555')

  await Promise.all(prefetchTasks)
  await ctx.render('index', {
	title: 'test',
	dev: ctx.app.env === 'development',
	reduxData: store.getState(),
	app: renderToString(
		<Provider store={store}>
			<RouterContext {...renderProps} />
		 </Provider>
		)
  })
}
