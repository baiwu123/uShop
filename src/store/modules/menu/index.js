// 引入接口文件
import {getMenuList} from '../../../util/axios'

const state = {
    menuList: [],
}
const getters = {
    getMenuList(state){
        return state.menuList
    }
}
const mutations = {
    // 获取菜单
    REQ_MENULIST(state,payload){
        state.menuList = payload
    }
}
const actions = {
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            // console.log(res,'菜单列表');
            commit('REQ_MENULIST',res.data.list)
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