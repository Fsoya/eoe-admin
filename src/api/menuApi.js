import Vue from 'vue'

const apiUrl = 'api/'

export default {
  getMenuTree () {
    return Vue.http.get(apiUrl + 'menu')
  }
}

