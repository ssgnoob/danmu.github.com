// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fontawesome from 'font-awesome/css/font-awesome.min.css'
import Velocity from 'velocity-animate'
import axios from 'axios'

import nullEl from './components/nullEl.vue'
import messageBox from './components/messageBox.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('App',App)

Array.prototype.findindexof=function (item) {
  for(let i=0;i<this.length;i++){
    if(this[i]==item)
      return	i
  }
  return false
}

axios.defaults.baseURL = 'http://101.132.116.22';
axios.defaults.timeout=2000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$hideTip=function () {
  let self=this
  setTimeout(()=>{
  self.$root.$children[0].currentEl=nullEl
  },1000)
}
Vue.prototype.$showTip=function (content)
{

  this.$root.$children[0].msg=content
  this.$root.$children[0].currentEl=messageBox

  this.$hideTip()

}
Vue.prototype.$ajax=axios


let vueRoot=new Vue({
  el: '#app',
  router,
  store,
  template: '<App ref="vueParent"></App>'
})




