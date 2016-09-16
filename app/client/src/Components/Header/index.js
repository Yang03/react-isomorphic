import React, { Component} from 'react'

const IS_SERVER = typeof window === 'undefined';
if(!IS_SERVER) {
  	require('./index.css')
}

class Header extends Component {
	render() {
		return(
			<main>
				<header className="header">
					<a>
						<i className="logo"> </i>
					</a>
				</header>
				<div className="search-box">
					<input type="search" placeholder="搜索您要卖的及其型号"/>
				</div>
				<div className="banner-box">
					<img src="http://file.baixing.net/201606/eed03dab2b17eae8ceba4ae2d0506bc0.jpg" className="banner"/>
				</div>
			</main>
		)
	}
}

export default Header
