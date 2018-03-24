<template>

  <div id="privateChat" style="overflow: hidden">

    <transition-group name="fade" mode="out-in">
      <i class="ques2 fa fa-user-circle fa-fw" key="ques2"></i>

    <div id="privateChat2" key="priC">
      <h2>In a Whisper...</h2>
      <slot name="inputSomething"></slot>
      <slot name="config" ></slot>
    </div>
    </transition-group>
  </div>

</template>
<style scoped>
  #privateChat2{
    margin-left: 35%;
    margin-right: 35%;
    margin-top: 13%;
    position: relative;
    z-index: 20;
  }
  h2{
    font-size: 54px;
    word-spacing: 25px;
    color: white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .ques2{
    position: absolute;
    right: 1%;
    top:1%;
    color:#fff;
    font-size: 24px;
  }


</style>
