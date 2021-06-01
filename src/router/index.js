import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Login = () => import ('../components/Login.vue')
const Home = () => import ('../components/Home.vue')
const Welcome= () => import ('../components/Welcome.vue')
const Users= () => import ('../components/user/Users.vue')
const Rights= () => import ('../components/power/Rights.vue')
const Roles= () => import ('../components/power/Roles.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect：重定向
    redirect: '/login'
  },
  {
    path:'/login',
    component: Login,
    meta:{
      title:'登录'
    },
  },
  {
    path:'/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {
        path:'/welcome',
        component: Welcome,
        meta:{
          title:'电商后台管理系统'
        },
      },
      {
        path:'/users',
        component: Users,
        meta:{
          title:'用户管理'
        },
      },
      {
        path:'/rights',
        component: Rights,
        meta:{
          title:'权限管理'
        },
      },
      {
        path:'/roles',
        component: Roles,
        meta:{
          title:'权限管理'
        },
      },
    ]
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  document.title=to.meta.title
  window.sessionStorage.setItem("activePath",to.path)
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  next()
})

export default router
