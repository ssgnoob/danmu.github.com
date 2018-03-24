<template>

  <div id="openChat" style="overflow: hidden">

    <transition v-for="(item,index) in danmuObjs"  appear name="move" :key="index"
                             v-on:appear="enter" :css="false">
      <div class='bigDanmu'  :speed="item.speed" @mouseenter="pop" @mouseleave='down' :index="item.id"
           :speedMode="item.speedMode" :style="{top:danmuH(item.danmuHeight),fontSize:(item.fontSize+'px')}">
      <div class="danmuObj" :danmuId="item.id">
      <div class="danmu" :key="index"
            :style="{fontSize:(item.fontSize+'px'),color:item.color,fontFamily:item.fontFamily,opacity:item.opacity}"
            >
      {{item.content}}
    </div>
        <div class="other" v-show="show==item.id && show!==null">
          <i class="fa fa-thumbs-up"  @click="likeit" :style="{color:(likearr.findindexof(item.id)!==false?'orange':'#ccc')}"></i>
          <span v-if="item.likeit" style="font-size: 8px">({{item.likeit}})</span>
          <i class="fa fa-commenting"  @click="toCommentid==item.id?(toCommentid=null):(toCommentid=item.id)"></i>
          <span v-if="item.commentid" style="font-size: 8px">({{item.commentid.length}})</span>
        </div>
        <!--清除浮动-->
        <div style="clear: both"></div>
        <transition name="fade2" >

        <div class="comment" v-show="(toCommentid==item.id) && show==item.id">
          <p  style="position: relative"><input type="text" placeholder="say something..." v-model="commentText">
            <span class="inputCount" :style="{color:inputCount>50?'red':'#999'}">{{inputCount}}/50</span>
            <button class="sendCmt" @click="toCommentthis">send</button></p>
        </div>
        </transition>
      </div>
        <div v-show="show==item.id && show!==null">
          <comment-list class='commentList' :clist="item.commentid" :fsize="item.fontSize" ></comment-list>
        </div>

      </div>
  </transition>
    <transition name="fade" mode="out-in">
    <div id="openChat2" key="openC">

    <h2>Just Say It!</h2>
    <slot name="inputSomething"></slot>
    <slot name="config"></slot>
    </div>

    </transition>
    </div>

</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import cookie from '../js/cookie'
  import commentList from './commentList.vue'
  export default{
    name:'openChat',
    data(){
      return{
        topHeight:0,
        toCommentid:null,
        commentText:'',
        show:null
      }
    },
    watch:{
      toCommentid:function(val,oldval){
          this.commentText=''
      }
    },
    computed:{...mapState(["danmuObjs"]),
      inputCount:function () {
        return this.commentText.length
      },
      likearr:function () {
     /* console.log(cookie.getCookie('likeit'))*/
       return cookie.getCookie('likeit')===null?[]:cookie.getCookie('likeit').split(',')
      }
    },
    methods:{...mapActions(['newDanmuList','changeOneDanmuAttr']),
      danmuH:function (height) {
        return window.innerHeight*height/100+'px'
        /*console.log(window.innerHeight*height/100)*/
      },
      toCommentthis:function () {
            let time=new Date()
            let sqlTime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
            let text=this.commentText
            let id=this.toCommentid
            let that=this
            if(text!==''){
              this.$ajax.post('/toComment',{comment:{toId:id,content:text,createdon:sqlTime}}).then(res=>{
                if(res.status===200)
                  this.danmuObjs.forEach(function(v,k){
                  if(v['id']==id)
                    that.changeOneDanmuAttr({index:k,obj:'commentid',value:res.data.comment})
                  })
                else
                  console.log(res.data.err)
              })
              this.commentText=''
            }
      } ,
      pop:function () {
        let elment=event.target
        Velocity(elment,'stop')
        elment.style.zIndex=30
        elment.style.backgroundColor='white'
        let index=elment.getAttribute('index')
          if(index!=0)
            this.show=index
        elment.style.transform='scale(1.2,1.2)'
        elment.style.border='2px solid #66afe9'
        elment.style.boxShadow=' 0 0 8px #66afe9'
      },
      down:function () {
      this.show=null
        let elment=event.target
        elment.style.zIndex=2
        elment.style.transform=''
        elment.style.border='none'
        elment.style.boxShadow=''
        elment.style.backgroundColor='transparent'
        let speed=elment.getAttribute('speed')
        let speedMode=elment.getAttribute('speedMode')
        let right=elment.style.right
        right=right.slice(0,right.length-2)

        Velocity(elment,{right:0},{duration:right/(2*speed)*1000,easing:'ease-in',loop:0,complete:function () {
          Velocity(elment,{right:window.innerWidth-elment.offsetWidth},{duration:(window.innerWidth-elment.offsetWidth)/speed*1000,easing:speedMode,loop:true})
        }})

      },
      enter:function (el,done) {

        let speed=el.getAttribute('speed')
        let speedMode=el.getAttribute('speedMode')

        Velocity(el,{right:window.innerWidth-el.offsetWidth-10},{duration:(window.innerWidth-el.offsetWidth)/speed*1000,easing:speedMode,complete:done,loop:true})
        /*console.log(window.innerWidth/speed)*/
      },
      showContent:function () {
        console.log(1)
      },
      likeit:function () {
        let el = event.target
        let danmuId = event.target.parentNode.parentNode.getAttribute('danmuId')
        if (el.style.color === 'orange') {
          this.$ajax.post('cancelLike',{danmuid:danmuId}).then(res=>{
            if(res.status===200){
              this.$store.state.danmuObjs.forEach(function (v, k) {
                if (v['id'] == danmuId)
                  v['likeit'] = res.data.number
              })
              //设置cookie，1小时只能给一条留言点一次赞

              let likestr = cookie.getCookie('likeit')
              let likearr=likestr.split(',')
              let index=likearr.findindexof(danmuId)
              likearr[index]=''
                cookie.SetCookie('likeit', likearr.join(','))


              Velocity(el, {scale: (4, 4), opacity: 0}, {
                duration: 1000, begin: function () {
                  el.style.color = '#ccc'
                }, complete: function () {

                  el.style.opacity = 1
                  el.style.transform = null
                }
              })
            }

          })
        }
        else {
          this.$ajax.post('/likeit', {danmuid: danmuId}).then(res => {
            if (res.status === 200) {

              this.$store.state.danmuObjs.forEach(function (v, k) {
                if (v['id'] == danmuId)
                  v['likeit'] = res.data.number
              })
              //设置cookie，1小时只能给一条留言点一次赞

              let likearr = cookie.getCookie('likeit')
              if (likearr === null)
                cookie.SetCookie('likeit', danmuId)
              else
                cookie.SetCookie('likeit', likearr + ',' + danmuId)


              Velocity(el, {scale: (4, 4), opacity: 0}, {
                duration: 1000, begin: function () {
                  el.style.color = 'orange'
                }, complete: function () {

                  el.style.opacity = 1
                  el.style.transform = null
                }
              })

            }
          })
        }
      }
    },
    components:{
      'comment-list':commentList
    },
    mounted:function () {
      let that=this
      this.$ajax.get('/getDanmu?type=1').then(res=> {
        if(res.status===200){
          this.newDanmuList(res.data)
          /*let commentArr=res.data.map((item)=>{
            return {'id':item['id'],
              'commentid':item['commentid']===null?[]:item['commentid'].split(',')}
          })*/
          this.$ajax.get('/getComment').then(res=>{

            if(res.status===200){


              let map=new Map()
              res.data.comments.forEach((v,k)=>{
                map.set(v['parentId'],[])

              })
              res.data.comments.forEach((v,k)=>{
                map.get(v['parentId']).push(v)

              })
              /*console.log(map)*/
              let commentArr=[]
              that.danmuObjs.forEach((v,k)=>{
                commentArr=map.get(v['id'])
                that.changeOneDanmuAttr({index:k,obj:'commentid',value:commentArr})
              })
            }



          }).catch(e=>{
            console.log(e)
          })

        }else
          console.log('获取弹幕数据失败！')
      }).catch(function (e) {
        console.log(e)
      })
    }
  }
</script>
<style scoped>
  #openChat2{

    margin-left: 35%;
    margin-right: 35%;
    margin-top: 13%;
    position: relative;
    z-index: 20;
  }
  h2{
    font-size: 54px;
    word-spacing: 50px;
  }
  .danmuObj .other i{
   /* vertical-align: middle;*/
    font-size: 16px;
    cursor: pointer;
  }
  .bigDanmu{
    display: inline-block;
    position: absolute;
    z-index: 2;
    right:0;
    background-color: transparent;
    border-radius: 5px;
  }
.danmuObj .other{
  float: left;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
 /* padding: 6px 0;*/
  padding-left: 5px;
 /* overflow: hidden;*/
}
.danmuObj .danmu{
  float: left;
  width: fit-content;
  max-width: 300px;
  overflow: hidden;
  margin-right: 10px;
}
  .danmuObj{

   /* border: 1px solid #ccc;*/
   /* background-color: #fff;*/
    border-radius: 5px;
   padding: 5px;
    padding-left: 20px;

   /* font-size: 24px;*/
    color: #ccc;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade2-enter-active, .fade2-leave-active {
    transition: opacity .5s;
  }
  .fade2-enter, .fade2-leave-to {
    opacity: 0;
  }
  .other{
    width: 100px;
  }
  .comment{
    width: inherit;
    padding-left: 10%;
    padding-top: 5px;

  }
  .comment p input{
    box-sizing: border-box;
    width: 90%;
    border: 1px solid #ccc;
    margin: 5px 10px;
    border-radius: 5px;
    height: 20px;
    padding: .5% 2%;
    padding-right: 25%;
  }
  .comment ul{
    list-style: none;
  }
    .sendCmt{
      color:#666;
      width: 40px;
      position: absolute;
      top: 25%;
      right: 5px;
      background-color: transparent;
      border: 0;
      font-size: 6px;
      height: 20px;
      box-sizing: content-box;
      cursor: pointer;
    }
  .inputCount{
    color: #999;
    position: absolute;
    right: 18%;
    top: 12px;
    font-size: 12px;
  }
</style>
