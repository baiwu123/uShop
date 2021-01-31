// 引入接口文件
import {getBannerList} from '../../../util/axios'

const state = {
    bannerList: [],
}
const getters = {
    getBannerList(state){
        return state.bannerList
    }
}
const mutations = {
    // 获取轮播图
    REQ_BANNER(state,payload){
        state.bannerList = payload
    }
}
const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            // console.log(res,'轮播图列表');
            commit('REQ_BANNER',res.data.list)
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}