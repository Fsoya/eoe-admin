import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'// 页面顶部进度条
import 'nprogress/nprogress.css'

import routes from './routes'
// import rightMixin from './mixin/rights'
import userApi from './api/userApi'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

// Vue.mixin(rightMixin)

Vue.http.interceptors.push(function (request, next) {
  let token = window.sessionStorage.getItem('token')
  if (token) {
    request.headers.set('Access-Token', token)
  }

  next(function (response) {
    if (response.body.status === 3002) {
      store.dispatch('showFailed', response.body.msg)
      return request.respondWith(response.body, {
        status: 404,
        statusText: 'Not found'
      })
    }
    return response
  })
})

const router = new VueRouter({
  routes,
  hashbang: false,
  history: true,
  root: '/',
  saveScrollPosition: true
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let sysUser = store.getters.sysUser
  if (to.meta.noAuth || sysUser) {
    if (sysUser) {
      setRights(sysUser, to)
    }
    next()
  } else {
    let token = window.sessionStorage.getItem('token')
    if (token) {
      userApi.queryToken(token).then((resp) => {
        if (resp.body.data) {
          sysUser = resp.body.data
        } else {
          window.sessionStorage.removeItem('token')
          next('/')
          return false
        }

        store.dispatch('signIn', sysUser)
        setRights(sysUser, to)
        next()
      })
    } else {
      next('/')
    }
  }
})

router.afterEach(transition => {
  NProgress.done()
})

// ====================
// 获取当前菜单权限
// ====================
function setRights (sysUser, to) {
  if (to.meta.rights) return false
  let menus = sysUser.menus
  menus.every((menu) => {
    if (menu.userMenus) {
      menu.userMenus.every((userMenu) => {
        if (userMenu.path === to.fullPath) {
          to.meta.rights = userMenu.rights ? userMenu.rights : []
          return false
        }
      })
    } else {
      if (menu.path === to.fullPath) {
        to.meta.rights = menu.rights ? menu.rights : []
        return false
      }
    }
  })
}

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
}).$mount('#app')
