import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/userModule'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  failed: {show: false}
}

// 创建 store 实例
export default new Vuex.Store({
  state,
  modules: {
    userModule
  },
  actions,
  getters,
  mutations,
  debug: true
})
