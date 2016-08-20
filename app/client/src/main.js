import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './Store/configureStore'

const store = configureStore(window.__REDUX_STATE__)
const app = document.getElementById('app')

render(
	 <Provider store={store}>
		{routes}
	 </Provider>, document.getElementById('app'))
