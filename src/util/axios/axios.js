import axios from 'axios'
// 引入路由模块
import router from '../../router'

let http = axios.create({
    baseURL: '/api'
})

// axios拦截器
// 请求拦截
http.interceptors.request.use(req=>{
    // console.log(req);
    let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token : ""
    req.headers.authorization = token;
    return req
})

// 响应拦截
http.interceptors.response.use(res=>{
    // console.log(res);
    if(res.data.code===500){
        alert(res.data.msg)
        router.push('/login')
    }else if(res.data.code===403){
        alert(res.data.msg)
        router.push('/login')
    }else{
        return res;
    }
})


export default http