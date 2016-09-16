import axios from 'axios'

export const CATEGORY_ALL = 'CATEGORY_ALL'

const act = (type, playload) => ({type, playload})

const IS_SERVER = typeof window === 'undefined';

const baseUrl = IS_SERVER ? 'http://localhost:3000/api' : '/api'

export function loadCategoryAll(state) {
	//const store = getState()
	return (dispatch) => {
		return axios({
					method: "get",
					url: `${baseUrl}/categoryAll`
				})
				.then((res)=> {
					dispatch(act(CATEGORY_ALL, res.data))
				})
	}
}
