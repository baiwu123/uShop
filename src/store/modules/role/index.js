// 角色模块
// 引入接口模块
import {getRoleList} from '../../../util/axios'
const state = {
    roleList: []
}

const mutations = {
    REQ_ROLELIST(state,payload) {
        state.roleList = payload
    }
}

const actions = {
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            // console.log(res,'角色列表');
            if(res.data.code===200){
                commit('REQ_ROLELIST',res.data.list)
            }
        })
    }
}

const getters = {
    getRoleList(state){
        return state.roleList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}