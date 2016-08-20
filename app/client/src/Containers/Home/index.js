import React from 'react'
import { connect } from 'react-redux'
import {loadCategoryAll} from '../../Actions'
import Header from '../../Components/Header'
import Items from '../../Components/Items'

class Home extends React.Component {
	constructor(props) {
		super(props)
	}
	static fetchData(state, dispatch) {
		const fetchTasks = []
	    fetchTasks.push(
	      dispatch(loadCategoryAll(state))
	    )
	    return fetchTasks
	}
	componentDidMount() {

		const { dispatch } = this.props
		this.constructor.fetchData(this.props, dispatch)
	}
	render () {
		return <div id="home">
			<Header/>
			<Items items={this.props.items}/>
		</div>
	}
}

function mapStateToProps(state) {
	//console.log(state)
	return state.catgories
}

export default connect(mapStateToProps)(Home)
