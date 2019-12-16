import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/index',
      component: Index
    }
  ]
})
