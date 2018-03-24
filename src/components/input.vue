
<template>
  <div id="inputSomething">
    <input type="text" id="inputPos" placeholder="try something..." autofocus="autofocus" v-model="content" @keyup.enter="fire(content)" :style="{fontFamily:danmuAttr.fontFamily}">
    <span class="inputCount" :style="{color:inputCount>50?'red':'#999'}">{{inputCount}}/50</span>
    <i class="fa fa-gear" @click="showOrHide"></i>
    <p>
      <input type="button" class="bgg" value="fire" @click="fire(content)">
      <input type="button" class="bgy" value="clear" @click="content=''">
    </p>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
/*  import instance  from '../js/axiosObj'*/
  export default{
    name:'inputSomething',
    data(){
      return{
        content:'',
        show:this.$store.state.show,

      }
    },
    computed:{...mapState(["danmuAttr",'userid','newUser']),
      inputCount:function () {
        return this.content.length
      }
    },
    methods:{
      ...mapActions(['showOrHide','danmuPush','createNewUser']),
      fire:function (content) {
       /* console.log(this.danmuAttr)*/
       /*console.log(this.$router.currentRoute.path)*/
       if(content==='inprivate')
         this.$router.push({path:'/private'})
        else if(content==='benormal')
          this.$router.push({path:'/'})
        else {
         if(this.$router.currentRoute.path==='/private' && this.userid===0){
           this.$showTip('微信登陆接口尚未接入\n该功能尚未开放')
           return;
           this.createNewUser()
         }

         else {
           if(this.inputCount>50) {

             this.$showTip('输入字数超过内容上限！')
             return
           }
           if(this.$router.currentRoute.path==='/private'){
             console.log(1)
             this.$showTip('微信登陆接口尚未接入\n该功能尚未开放')
             return;
           }
           let newDanmu = JSON.parse(JSON.stringify(this.danmuAttr))
            let time=new Date()
           let sqlTime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
           newDanmu["content"] = content
           newDanmu['createdOn']=sqlTime
           this.danmuPush(newDanmu)
           //ajax
           this.$ajax.post('/newDanmu', {
             danmu: newDanmu,
             type: (this.$router.currentRoute.path==='/private'?2:1)
           }).then(function (res) {
             if(res.status===200)
               console.log('发射成功！')
             else
               console.log('发射失败！')
           }).catch(function (e) {
             console.log(e)
           })
         }
       }
        this.content=''
      }
    }
  }
</script>
<style scoped="">
    #inputSomething{
      position: relative;
      margin-top: 16px;
    }
    #inputPos{
      min-width: 100px;
      border: 1px solid #ccc;
      width:80%;
      border-radius: 5px;
      height: 40px;
      padding: .5% 1%;
      box-sizing: border-box;
      padding-right: 17%;
      box-shadow:0 1px 1px rgba(0,0,0,.075);
      outline: none;
      transition: border-color ease-in-out .3s,
                  box-shadow ease-in-out .7s;
    }
    #inputPos:focus{
      border: 1px solid #66afe9;
      box-shadow: 0 0 8px rgba(102,175,233,.6);
    }
    .inputCount{
      color: #999;
      position: absolute;
      right: 16%;
      top: 12px;
    }
    i{
      color: #999;
      position: absolute;
      right: 12%;
      top: 12px;
    }
    i:hover{
      cursor: pointer;
    }
    .bgg{
      background-color: #5cb85c;

    }
    .bgy{
      background-color: #f0ad4e;
      margin-left:10%;
    }
    p{
      margin: 8px;
    }
    p input{
      min-width: 75px;
      margin: 8px;
      border-radius: 4px;
      width:30%;
      line-height: 1.3;
      padding: .7% 1%;
      font-size: 18px;
      color: white;
      border: 1px solid transparent;
    }
</style>
