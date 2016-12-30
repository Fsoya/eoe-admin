import Vue from 'vue'

const apiUrl = 'api/'

export default {
  signIn (userName, password) {
    console.log(userName)
    return Vue.http.post(apiUrl + 'login', {userName, password})
  },
  queryAll (pageNo, pageSize = 10) {
    return Vue.http.get(apiUrl + 'eoe/mybatis/sysuser/page', {params: {pageNo, pageSize}})
  },
  queryById (id) {
    return Vue.http.get(apiUrl + 'eoe/mybatis/sysuser/' + id)
  },
  save (sysUser) {
    return Vue.http.put(apiUrl + 'eoe/mybatis/sysuser/', sysUser)
  },
  queryToken (token) {
    return Vue.http.get(apiUrl + 'token/' + token)
  }
}

