import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import  VueEditor from 'vue2-editor'

import './style.css'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.use(VueEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
