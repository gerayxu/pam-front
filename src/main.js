import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from "axios";
import router from './router'
import constants from './global/constants'
import './plugins/axios'
import './style/index.css'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.Constants = constants

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
