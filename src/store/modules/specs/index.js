// 管理员模块
// 引入接口模块
import {getSpecsList,getSpecsCount} from '../../../util/axios'
const state = {
    specsList: [],
    size:2,
    page:1,
    countNum:0
}

const mutations = {
    REQ_SPECSLIST(state,payload) {
        state.specsList = payload
    },
    REQ_SPECSCOUNT(state,payload) {
        state.countNum = payload
    },
    CHANGE_PAGE(state,payload) {
        state.page = payload
    }
}

const actions = {
    // 获取管理员列表
    getSpecsListAction(payload) {
        getSpecsList({
            size:payload.state.size,
            page:payload.state.page
        })
        .then(res=>{
            // console.log(res,'管理员列表');
            if(res.data.code===200){
                let list = res.data.list ? res.data.list : [];
                payload.commit('REQ_SPECSLIST',list);
                if(payload.state.page!=1 && list.length==0){
                    payload.dispatch('changePageAction',payload.state.page-1);
                    return
                }
            }
        })
    },
    // 获取总条数
    getCountAction(payload){
        getSpecsCount()
        .then(res=>{
            // console.log(res,'总条数');
            if(res.data.code===200){
                payload.commit('REQ_SPECSCOUNT',res.data.list[0].total);
            }
        })
    },
    // 修改page行动
    changePageAction(context,payload){
        // 上下文对象   触发行动传的参数
        context.commit('CHANGE_PAGE',payload);
        // 重新调取接口
        context.dispatch('getSpecsListAction')
    }
}

const getters = {
    getSpecsList(state){
        return state.specsList;
    },
    // 渲染条数
    getSpecsSize(state){
        return state.size;
    },
    // 总条数
    getCountNum(state){
        return state.countNum
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}