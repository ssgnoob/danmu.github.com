<template>
  <transition :duration="{ enter: 500, leave: 800 }"  name="fade">
  <div id="messageBox" v-show="show">
    <pre> {{message}}</pre>
  </div>
  </transition>
</template>
<script>
  export default {
    name:'messageBox',
    props:['message'],
    data(){
      return{
        show:false,
        mess:''
      }
    },
    /*watch:{
      mess:function (val) {
        let id=0
        if(val!=''){
          let self=this
          self.show = true

          id=setTimeout(()=>{
            self.show=false

          },1000)
          setTimeout(()=>{
            this.mess=''
          },2000)
        }else{
          window.clearTimeout(id)
        }

      }
    },*/
    mounted:function () {
      this.mess=this.message
      this.show=true
    }
  }
</script>
<style>

</style>
