import Vue from 'vue'
import Router from 'vue-router'
import inputSomething from '@/components/input.vue'
import openChat from '@/components/openChat.vue'
import config from '@/components/attr.vue'
import privateChat from '@/components/privateChat.vue'
import messageBox from '@/components/messageBox.vue'

import changeColor from '../js/changeColor'
Vue.use(Router)
/*import {mapState} from 'vuex'*/
const normal={
  template:`
      
      <openChat>
      <inputSomething slot="inputSomething"></inputSomething>
      <config slot="config" fc="black"></config>
      </openChat>
   
  `
}
const privateC={
  template:`

    <privateChat>
    <inputSomething slot="inputSomething"></inputSomething>
      <config slot="config" fc="white"></config>
      </privateChat>
    
  `,
  beforeRouteEnter(to,from,next){
    /*next(vm=>{
      /!*console.log(vm.$parent.bgc)*!/
      changeColor.changeColor(vm.$parent.bgc,3000)

    })*/
    next(vm=>{
      changeColor.changeColor.call(vm,1000)
    })

  },
  beforeRouteLeave(to,from,next){
    changeColor.changeColor.call(this,1000)
    next()
  }
}
Vue.component('inputSomething',inputSomething)
Vue.component('openChat',openChat)
Vue.component('config',config)
Vue.component('privateChat',privateChat)

export default new Router({
  mode:'history',
 /* base: '/note/',  //添加的地方*/
  base:__dirname,
  routes: [
    {
      path: '/',
      name: 'normal',
      component: normal
    },{
        path:'/private',
      name:'private',
      component:privateC
    }
  ],

})


