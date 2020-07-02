import Vue from 'vue'
import App from './App.vue'
import { Button, Toast, NavBar, Form, Field } from 'vant'
import 'amfe-flexible'
import './style/base.css'
import './style/iconfont.css'
import router from './router' // 如果是index可以省略后面
// 引入header组件
import header from './common/header.vue'
// 引入axios
import axios from 'axios'

// 把axios挂载到vue上main
Vue.prototype.$axios = axios
// 把基地址添加到原型链上
Vue.prototype.baseUrl = 'http://localhost:3000/'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(NavBar)

Vue.config.productionTip = false
// 注册header为全局组件
Vue.component('hm-header', header)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
