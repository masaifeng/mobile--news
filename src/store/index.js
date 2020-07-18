import Vue from 'vue'
import Vuex from 'vuex'
// 挂载
Vue.use(Vuex)
// 创建state
const state = {
  name: ''
}
const mutations = {
  clear(state) {
    // 清除name中的数据
    state.name = ''
  },
  add(state) {
    state.name = 'Home'
  }
}
// 创建vuex实例
const store = new Vuex.Store({
  state,
  mutations
})
// 向外暴露
export default store
