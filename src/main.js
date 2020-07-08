import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Toast,
  NavBar,
  Form,
  Field,
  Divider,
  Cell,
  CellGroup,
  Image as VanImage,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  Overlay
} from 'vant'

import 'amfe-flexible'
import './style/base.css'
import './style/iconfont.css'
import router from './router' // 如果是index可以省略后面
// 引入header组件
import header from './common/header.vue'
// 引入axios
import axios from 'axios'
// 引入user界面中的列表
import userlist from './common/userList.vue'
import moment from 'moment'

// import VueCropper from 'vue-cropper'

// 把axios挂载到vue上main
Vue.prototype.$axios = axios
// 把基地址添加到原型链上
Vue.prototype.baseUrl = 'http://localhost:3000'
// 给axios添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 获取token
  const token = localStorage.getItem('token')
  // 如果token不是空就给请求头设置token
  if (token) {
    // 给请求头设置统一的token
    config.headers.Authorization = token
  }
  return config
})

Vue.use(Form)
Vue.use(Uploader)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Divider)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Overlay)

// 定义过滤器
Vue.filter('timeFil', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
// 全局方法判断获取到的url是否带http
Vue.prototype.pageUrl = function(data) {
  if (data.startsWith('http')) {
    return data
  } else {
    return this.baseUrl + data
  }
}

Vue.config.productionTip = false
// 全局组件
Vue.component('hm-header', header)
Vue.component('hm-userlist', userlist)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
