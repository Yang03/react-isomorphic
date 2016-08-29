import axios from 'axios'
import {encText, decText } from  './util/encrypt'
import aes from 'aes-cross'
import crypto from 'crypto'

const baseUrl = 'http://120.55.247.39:8080/servicefactory';
const appKey = 'sut8DmyokeDixx2J';
const appId = '100012';


function sign() {
	const timestamp = Math.floor(new Date().getTime() / 1000)
	const str = appId + timestamp
	return encText(str, appKey)
}

function buildQuery(obj) {
	const keys = Object.keys(obj)
	const arry = []
	for (let i = 0, len = keys.length; i < len; ++i) {
		let key = keys[i]
		arry.push(key + '=' + encodeURIComponent(obj[key]))
	}
	return arry.join('&')
}

async function getData(path, opts = {}) {
	const defaultOpts = {
			'appId': appId,
			'appKey': appKey,
			'timestamp': Math.floor(new Date().getTime() / 1000),
			'sign': sign()
		}
	const queryOpts = Object.assign(opts, defaultOpts)
	const queryStr = buildQuery(queryOpts)
	const requestUrl = `${baseUrl}${path}?${queryStr}`
	return await axios.get(requestUrl)
}

export async function categoryAll(ctx, next) {
	const response = await getData('/category/all')
	let data = []
	if (response.data.code = '200') {
		data = formatCategory(response.data.data)
	}
	let results = await getCategoies(data)
	let result = formatCategires(results)
	data.forEach((value, index) => {
		data[index].child = result[index]
	})
	ctx.body = data
}

 async function getCategoies(data) {
	let promises = data.map((value) => getData('/manufacturer/category/', {'id': value.id}))
	let results = [];
	for (let promise of promises) {
		results.push(await promise);
	}
	return results
}

function formatCategory (data) {
	const arr = ['手机', '智能数码', '笔记本', '单反相机', '镜头', '平板电脑']
	const brandList = data.filter((value, index) => {
		return arr.indexOf(value.name) >= 0
	})
	return brandList
}


function formatCategires (data) {
	let arr = []
	data.map((value, index) => {
		if (value.data.code == 200) {

			let temp = sortBykey(value.data.data, 'order')
			arr[index] = temp
		} else {
			arr[index] = []
		}
	})
	return arr
}

function sortBykey(arr, key) {
	return arr.sort(function(a, b){
		let x = a[key], y = b[key]
		if (x < y) {
			return -1
		} else if (x > y) {
			return 1
		}
		return 0
	})
}
