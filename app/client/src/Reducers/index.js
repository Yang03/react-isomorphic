import {combineReducers} from 'redux'
import {CATEGORY_ALL} from '../Actions'

const initState = {
	items: []
}

function catgories(state = initState, action) {
	switch (action.type) {
		case CATEGORY_ALL:
			return Object.assign({}, state, {items:action.playload})
		default:
			return state

	}
}

const rootReducer = combineReducers({
	catgories
})

export default rootReducer
