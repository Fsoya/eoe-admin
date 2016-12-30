import * as types from './mutationTypes'

export default {
  [types.SHOW_FAILED] (state, { message }) {
    state.failed.show = true
    state.failed.msg = message
  },
  [types.HIDE_FAILED] (state) {
    state.failed.show = false
    state.failed.msg = ''
  }
}
