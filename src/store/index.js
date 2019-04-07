import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

import UserToken from '../page/global'

Vue.use(Vuex)



const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	get userToken(){
		return localStorage.getItem('token')
	}
	,
	setUserToken(token) {
		localStorage.setItem("token", token)
	}
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	setUserToken(token)
	{
		localStorage.setItem("token",token)
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	// token:UserToken,
	mutations,
})
