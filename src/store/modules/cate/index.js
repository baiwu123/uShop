// 引入接口文件
import {getCateList} from '../../../util/axios'

const state = {
    cateList: [],
}
const getters = {
    getCateList(state){
        return state.cateList
    }
}
const mutations = {
    // 获取菜单
    REQ_CATELIST(state,payload){
        state.cateList = payload
    }
}
const actions = {
    getCateListAction({commit}){
        getCateList()
        .then(res=>{
            // console.log(res,'分类列表');
            commit('REQ_CATELIST',res.data.list)
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