// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Mint from 'mint-ui'
import {Swipe,SwipeItem,Popup} from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Popup.name,Popup);


Vue.prototype.$http=axios;
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
document.documentElement.style.fontSize=document.documentElement.clientWidth>750?750/10.8+"px":document.documentElement.clientWidth/10.8+"px";
/* eslint-disable no-new */

Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
