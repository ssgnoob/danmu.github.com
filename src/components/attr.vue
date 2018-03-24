<template>
  <transition name="fade">
  <div id="danmuAttr" v-show="show">
   <!-- <message-box :message=msg></message-box>-->
    <!--<div class="tooltip"><p>输入inprivate进入私密留言</p><p>输入benormal回到普通留言</p><p>私密留言需要登陆后才能发言</p></div>-->
    <ul :style="{color:fc}">
      <li><span>字体大小</span> <select :value="danmuAttr['fontSize']" @change="change('fontSize')">
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
        <option value="30">30</option>
        <option value="32">32</option>
        <option value="34">34</option>
        <option value="36">36</option>
        <option value="38">38</option>
        <option value="40">40</option>
        <option value="42">42</option>
        <option value="44">44</option>
        <option value="46">46</option></select>
      </li>
      <li><span>字体颜色</span> <input type="color" @change="change('color')"></li>
      <li><span>背景颜色</span> <input type="color" @change="change('backgroundColor')"></li>
      <li><span>字形</span> <select :value="danmuAttr.fontFamily" @change="change('fontFamily')">
        <option value="黑体">黑体</option>
        <option value="宋体">宋体</option>
        <option value="微软雅黑">微软雅黑</option>
      </select></li>
      <li><span>速度</span> <input type="number" :value="danmuAttr.speed" min="1" step="10" max="300" @change="change('speed')"></li>
      <li><span>透明度</span> <input type="number" :value="danmuAttr.opacity" max="1" min="0" step="0.1" @change="change('opacity')"></li>
      <li><span>弹幕高度</span> <input type="number" :value="danmuAttr.danmuHeight" max="100" step="5" min="0" @change="change('danmuHeight')">%</li>
      <li><span>速度变化</span> <select :value="danmuAttr.speedMode" @change="change('speedMode')">
        <option value="linear">匀速</option>
        <option value="ease-in">加速</option>
        <option value="ease-out">减速</option>
        <option value="ease">中间快两边慢</option>
        <option value="ease-in-out">慢速开始和结束</option>
      </select></li>
    </ul>
  </div>
  </transition>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import messageBox from './messageBox.vue'
  export default{
    name:'danmuAttr',
    props:['fc'],
    components:{
      'message-box':messageBox
    },
    data(){
      return{
        /*show:this.$store.state.show,*/
        /*fontSize:mapState(["danmuAttr"])["fontSize"],
        color:mapState(["danmuAttr"]),
        fontFamily:mapState(["danmuAttr"]),
        speed:mapState(["danmuAttr"]),
        speedMode:mapState(["danmuAttr"]),
        opacity:mapState(["danmuAttr"]),
        danmuHeight:mapState(["danmuAttr"])*/
       /* ...mapState(["danmuAttr"])*/
       msg:''
      }
    },
    computed:{...mapState(["danmuAttr"]),...mapState(["show"])},
    methods:{...mapActions(["changeAttr"]),
        change:function (obj) {

          this.changeAttr([obj,event.target.value])

        }
    },
    watch:{
      show:function (val,oldval) {
      /*  let elment=document.getElementsByClassName('tooltip')[0]*/
        if(val){
          /*Velocity(elment,{opacity:0},{duration:2000,begin:function () {
            elment.style.display='block'
            elment.style.opacity=1
          },complete:function(){
            elment.style.display='none'
          }})*/
          /*this.$root.$children[0].msg='输入inprivate进入私密留言\n输入benormal回到普通留言\n私密留言需要登陆后才能发言'
          this.$root.$children[0].currentEl=messageBox*/

          this.$showTip('输入inprivate进入私密留言\n输入benormal回到普通留言\n私密留言需要登陆后才能发言')
          this.msg='输入inprivate进入私密留言\n输入benormal回到普通留言\n私密留言需要登陆后才能发言'
        }
       /* else{
          Velocity(elment,'stop')
          elment.style.display='none'
        }*/
      }
    }
  }
</script>
<style scoped>
  ul{
    width: 100%;
    padding-left: 10%;
   /* padding-right: 10%;*/
    list-style: none;
   /* display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;*/

  }
  ul:after{
    content: '';
    display: block;
    clear: both;
  }
  .tooltip{
    /*position: absolute;
    top: 5%;
    left:42%;*/
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    width: fit-content;
    height: fit-content;
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color:rgba(255,255,255,0.8);
    border: 1px solid #666;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 1px 1px 1px #666;
    display: none;
  }
  li{
    /*margin-right: 5%;*/
    margin-top: 7%;
    float: left;
    width: 45%;
    text-align: left;
    min-width: 150px;

  }
  li span{
    display: inline-block;
    width: inherit;
    box-sizing: border-box;
  }
  li input,select{
    width: 40%;
    min-width: 50px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    display: inline-block;
    height: 25px;
    padding: 1px 2%;
    font-size: 14px;
    color: #555;

  }
  li:nth-of-type(7) select{
    min-width: 120px;
  }

 /* li:nth-of-type(odd){
   !* text-align: right;*!
    margin-left: 25%;
  }
  li:nth-of-type(even){
    !*text-align: left;*!
    margin-left: -10%;
  }
*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
</style>
