// import userApi from '../../api/userApi'
import * as types from '../mutationTypes'

const state = {
  sysUser: null
}

// 定义所需的 mutations
const mutations = {
  SIGN_IN (state, sysUser) {
    state.sysUser = sysUser
  },
  SIGN_OUT (state) {
    state.sysUser = null
  },
  UPDATE_ACTIVE_SYSUSER (state, sysUser) {
    state.activeSysUser = sysUser
  }
}

// 定义 getters
const getters = {
  sysUser (state) {
    return state.sysUser
  },
  menus (state) {
    return state.sysUser ? state.sysUser.menus : null
  }
}

const actions = {
  signIn ({commit}, user) {
    commit(types.SIGN_IN, user)
  },
  signOut ({commit}) {
    commit(types.SIGN_OUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
