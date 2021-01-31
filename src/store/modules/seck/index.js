// 引入接口文件
import {getSeckList} from '../../../util/axios'

const state = {
    seckList: [],
}
const getters = {
    getSeckList(state){
        return state.seckList
    }
}
const mutations = {
    // 获取菜单
    REQ_SECKLIST(state,payload){
        state.seckList = payload
    }
}
const actions = {
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            // console.log(res,'菜单列表');
            commit('REQ_SECKLIST',res.data.list)
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