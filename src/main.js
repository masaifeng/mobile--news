import Vue from 'vue'
import App from './App.vue'
import { Button, Field, Search } from 'vant'
import 'amfe-flexible'
Vue.use(Button)
Vue.use(Field)
Vue.use(Search)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
