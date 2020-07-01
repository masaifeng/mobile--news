// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入文件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// 把路由挂载到vue上面
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' }
  ]
})

export default router
