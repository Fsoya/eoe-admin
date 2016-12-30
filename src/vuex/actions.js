// 全局 state
import * as types from './mutationTypes'

export const showFailed = ({commit}, message) => {
  commit(types.SHOW_FAILED, {message})
}
export const hideFailed = ({commit}) => {
  commit(types.HIDE_FAILED)
}
