import { baseUrl } from './env'
import axios from 'axios'
import global_ from '../page/global'
import qs from 'qs'

// Vue.prototype.axios = axios;
// Vue.prototype.qs = Qs;

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	// console.log("33333------token:");
	// console.log("222222222---------token:", store.state.userToken());
	return new Promise(function (resolve, reject) {
      		axios.post(url, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res)=>{
			resolve(res.data);
		}).catch(function(error){
          reject(error);
		})

	});
}

export function async_new(url = '', data = {}, type = 'GET', method = 'fetch'){
	type = type.toUpperCase();
	url = baseUrl + url;
	
	
	
	console.log("---------token:", this.$store.state.userToken());


	return new Promise(function (resolve, reject) {
		axios.post(url, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': global_.token
			}
		}).then((res) => {
			resolve(res.data);
		}).catch(function (error) {
			reject(error);
		})

	});
}




	

// export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
// 	type = type.toUpperCase();
// 	url = baseUrl + url;

// 	if (type == 'GET') {
// 		let dataStr = ''; //数据拼接字符串
// 		Object.keys(data).forEach(key => {
// 			dataStr += key + '=' + data[key] + '&';
// 		})

// 		if (dataStr !== '') {
// 			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
// 			url = url + '?' + dataStr;
// 		}
// 	}

// 	if (window.fetch && method == 'fetch') {
// 		let requestConfig = {
// 			credentials: 'include',
// 			method: type,
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			mode: "cors",
// 			cache: "force-cache"
// 		}

// 		if (type == 'POST') {
// 			// console.log('============',JSON.stringify(data)),
// 			Object.defineProperty(requestConfig, 'body', {
// 				value: JSON.stringify(data)
// 			})
// 		}
		
// 		// try {
// 		// 	const response = await fetch(url, requestConfig);
// 		// 	const responseJson = await response.json();
// 		// 	console.log('--- ---', responseJson, url);
// 		// 	return responseJson
// 		// } catch (error) {
// 		// 	throw new Error(error)
// 		// }
	

// 		// axios.post(url, JSON.stringify(data), {
			
// 		// 	headers: {
// 		// 		'Content-Type': 'application/json'
// 		// 	}
// 		// }).then(res => {
// 		// 	return res
// 		// 		// console.log(res.data);
// 		// 		//控制台打印请求成功时返回的数据
// 		// 	})
// 		// 	.catch(function (err) {
// 		// 		if (err.response) {
// 		// 			console.log(err.response)
// 		// 			//控制台打印错误返回的内容
// 		// 		}
// 		// 	}.bind(this))
// 		// console.log('eee------', data)

// 		axios.post(url, JSON.stringify(data), {

// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 		}).then(res => {
// 			return new Promise((resolve, reject) => {
// 				if (res.code === 0) {
// 					resolve(res)
// 				} else {
// 					reject(res)
// 				}
// 			})
// 				// console.log(res.data);
// 				//控制台打印请求成功时返回的数据
// 			})
// 			.catch(function (err) {
// 				if (err.response) {
// 					console.log(err.response)
// 					//控制台打印错误返回的内容
// 				}
// 			}.bind(this))
// 		console.log('eee------', data)

// 	} else {
// 		return new Promise((resolve, reject) => {
// 			let requestObj;
// 			if (window.XMLHttpRequest) {
// 				requestObj = new XMLHttpRequest();
// 			} else {
// 				requestObj = new ActiveXObject;
// 			}

// 			let sendData = '';
// 			if (type == 'POST') {
// 				sendData = JSON.stringify(data);
// 			}

// 			requestObj.open(type, url, true);
// 			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			requestObj.send(sendData);

// 			requestObj.onreadystatechange = () => {
// 				if (requestObj.readyState == 4) {
// 					if (requestObj.status == 200) {
// 						let obj = requestObj.response
// 						if (typeof obj !== 'object') {
// 							obj = JSON.parse(obj);
// 						}
// 						resolve(obj)
// 					} else {
// 						reject(requestObj)
// 					}
// 				}
// 			}
// 		})
// 	}
// }