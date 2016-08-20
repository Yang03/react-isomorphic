import axios from 'axios'

export const CATEGORY_ALL = 'CATEGORY_ALL'

const act = (type, playload) => ({type, playload})
const baseUrl = process.env.IS_SEREVER ? '' : 'http://localhost:3000/'
export function loadCategoryAll(state) {
	//const store = getState()
	return (dispatch) => {
		return axios({
					method: "get",
					url: `${baseUrl}api/categoryAll`
				})
				.then((res)=> {
					dispatch(act(CATEGORY_ALL, res.data))
				})
	}
}
