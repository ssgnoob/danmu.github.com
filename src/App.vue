<template>
  <div id="app" :style="{backgroundColor:bgc}">

    <router-view/>
    <component :is="currentEl" :message=msg></component>
  </div>
</template>

<script>
 /* import {mapState} from 'vuex'*/
 import nullEl from './components/nullEl.vue'
 import messageBox from './components/messageBox.vue'
export default {
  name: 'App',
 /* computed:mapState(['backgroundColor'])*/
  data(){
    return{
      bgc:"RGB(255,255,255)",
      currentEl:nullEl,
      msg:''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
