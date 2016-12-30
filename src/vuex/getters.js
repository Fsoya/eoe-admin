// 全局 state
export const failedInfo = state => {
  return state.failed ? state.failed : {show: false}
}
