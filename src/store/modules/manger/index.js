// 管理员模块
// 引入接口模块
import {getMangerList,getMangerCount} from '../../../util/axios'
const state = {
    mangerList: [],
    size:2,
    page:1,
    countNum:0
}

const mutations = {
    REQ_MANGERLIST(state,payload) {
        state.mangerList = payload
    },
    REQ_MANGERCOUNT(state,payload) {
        state.countNum = payload
    },
    CHANGE_PAGE(state,payload) {
        state.page = payload
    }
}

const actions = {
    // 获取管理员列表
    getMangerListAction(payload) {
        getMangerList({
            size:payload.state.size,
            page:payload.state.page
        })
        .then(res=>{
            // console.log(res,'管理员列表');
            if(res.data.code===200){
                let list = res.data.list ? res.data.list : [];
                payload.commit('REQ_MANGERLIST',list);
                if(payload.state.page!=1 && list.length==0){
                    payload.dispatch('changePageAction',payload.state.page-1);
                    return
                }
            }
        })
    },
    // 获取总条数
    getCountAction(payload){
        getMangerCount()
        .then(res=>{
            // console.log(res,'总条数');
            if(res.data.code===200){
                payload.commit('REQ_MANGERCOUNT',res.data.list[0].total);
            }
        })
    },
    // 修改page行动
    changePageAction(context,payload){
        // 上下文对象   触发行动传的参数
        context.commit('CHANGE_PAGE',payload);
        // 重新调取接口
        context.dispatch('getMangerListAction')
    }
}

const getters = {
    getMangerList(state){
        return state.mangerList;
    },
    // 渲染条数
    getMangerSize(state){
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