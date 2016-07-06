import axios from 'axios'
import {encText, decText } from  './util/encrypt'
import aes from 'aes-cross'
import crypto from 'crypto'


function sign() {
    //console.log(Math.ceil(new Date().getTime()/ 1000))
    //
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const str = appId + timestamp
    return encText(str, appKey)
}

//BGNmpkJrPz/hAxX6X9SRUs8PetvRW4B6kx0TtPLALO8=
function buildQuery(obj) {
    const keys = Object.keys(obj)
    const arry = []
    for (let i = 0, len = keys.length; i < len; ++i) {
        let key = keys[i]
        arry.push(key + '=' + encodeURIComponent(obj[key]))
    }
    return arry.join('&')
}

function getData(path, opts = {}) {
    const defaultOpts = {
			'appId': appId,
			'appKey': appKey,
			'timestamp': Math.floor(new Date().getTime() / 1000),
			'sign': sign()
		}
    const queryOpts = Object.assign(opts, defaultOpts)
    const queryStr = buildQuery(queryOpts)
    const requestUrl = `${baseUrl}${path}?${queryStr}`
    return axios.get(requestUrl)
}

export async function categoryAll(ctx, next) {
    const response = await getData('/category/all')
    if (response.code = '200') {
        return response.data
    }
    return [];
    //ctx.body = reponse.data
}

function formatCategory (data) {
    const arr = ['手机', '智能数码', '笔记本', '单反相机', '镜头', '平板电脑']


}
