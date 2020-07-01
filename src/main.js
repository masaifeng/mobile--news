import Vue from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import 'amfe-flexible'
import './style/base.css'
import './style/iconfont.css'
import router from './router' // 如果是index可以省略后面
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
