import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import Vant from 'vant'
import 'vant/lib/index.css';

import router from './router/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
