// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入文件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/user_edit.vue'
import Follows from '../views/follows.vue'
import Userstar from '../views/userstar.vue'
import Comments from '../views/comments.vue'
// 把路由挂载到vue上面
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/userEdit', component: UserEdit, name: 'userEdit' },
    { path: '/follows', component: Follows },
    { path: '/userstar', component: Userstar },
    { path: '/comments', component: Comments }
  ]
})
// 添加路由守卫判断是否有token
router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('token')
  const url = ['/user', '/userEdit']
  if (url.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
      // this.$toast.fail('失败文案')
    }
  } else {
    next()
  }
})

export default router
