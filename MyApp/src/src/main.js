// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCorvova from 'vue-cordova'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.css'
import store from './store/index'


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/style/reset.css'
Vue.use(MintUI)

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole) 

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(VueCorvova);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
