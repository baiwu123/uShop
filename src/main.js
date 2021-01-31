// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 全局引入重置样式表
import './assets/css/reset.css'

// 创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

// 全局引入elementUI
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

// 全局引入组件
import gCom from './common'
for(let i in gCom){
  Vue.component(i, gCom[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
