import Vue from 'vue'
import Router from 'vue-router'
// 引入仓库
import Store from '../store'
// console.log(Store.getters.getUserInfo);
// 封装一个函数用来判断是否有权限进入
function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}

Vue.use(Router)

// 设置二级路由配置项
export const indexRouters = [
  {
    path:'/role',
    component: () => import('@/views/role/role'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path:'/manger',
    component: () => import('@/views/manger/manger'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manger') ? next() : next('/home')
    }
  },
  {
    path:'/menu',
    component: () => import('@/views/menu/menu'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path:'/goods',
    component: () => import('@/views/goods/goods'),
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: "/cate",
    component: () => import("@/views/cate/cate"),
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: "/specs",
    component: () => import("@/views/specs/specs"),
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: "/banner",
    component: () => import("@/views/banner/banner"),
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: "/seck",
    component: () => import("@/views/seck/seck"),
    name:'秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  },
  {
    path: "/member",
    component: () => import("@/views/member/member"),
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  }
]

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path:'/home',
          component: () => import('@/views/home')
        },
        ...indexRouters,
        {
          path:'',
          redirect:'/home',
        }
      ]
    },
    // 一级路由重定向
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

// 全局导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
    return;
  }
  if(Store.getters.getUserInfo){
    next();
    return;
  }
  next('/login');
})
export default router