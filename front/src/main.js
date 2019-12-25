import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css';

import router from './router/index'
import _ from 'lodash'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vant)

Vue.prototype._ = _ // load lodash

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
