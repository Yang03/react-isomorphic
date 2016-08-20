import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Home from './Containers/Home'
import BrandList from './Containers/BrandList'

export default (
	<Router history={browserHistory}>
		<Route path="home" component={Home}/>
		<Route path="brandList" component={BrandList}/>
	</Router>
)
