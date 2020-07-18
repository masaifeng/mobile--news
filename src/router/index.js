// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入文件
import store from '../store/index'
const Login = () => import(/* webpackChunkName: "users" */ '../views/Login.vue')
const Register = () =>
  import(/* webpackChunkName: "users" */ '../views/Register.vue')
const User = () => import(/* webpackChunkName: "users" */ '../views/User.vue')
const UserEdit = () =>
  import(/* webpackChunkName: "users" */ '../views/user_edit.vue')
const Follows = () =>
  import(/* webpackChunkName: "users" */ '../views/follows.vue')
const Userstar = () =>
  import(/* webpackChunkName: "users" */ '../views/userstar.vue')
const Comments = () =>
  import(/* webpackChunkName: "users" */ '../views/comments.vue')
const Home = () => import(/* webpackChunkName: "honmes" */ '../views/home.vue')
const Post = () => import(/* webpackChunkName: "honmes" */ '../views/post.vue')
const Editab = () =>
  import(/* webpackChunkName: "honmes" */ '../views/editab.vue')
const Search = () =>
  import(/* webpackChunkName: "honmes" */ '../views/search.vue')
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
    { path: '/comments', component: Comments },
    { path: '/', component: Home },
    { path: '/post', component: Post },
    { path: '/editab', component: Editab },
    { path: '/search', component: Search }
  ]
})
// 添加路由守卫判断是否有token
router.beforeEach((to, from, next) => {
  store.commit('clear')
  // 给vuex属性添加值
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
