<template>
    <div id="commentList" v-if="(typeof(clist)!=='undefined')">
      <ul>
        <li v-for="(item,index) in clist" v-show="showComment(index,showMoreComments,page)"
            :style="{/*fontSize:fsize-5+'px',*//*borderTop:(index>0?'1px dashed #ccc':'none')*/}">
          <p><pre>{{content(item.content)}}</pre></p>
          <div class="likeitdiv">
            <i class="likeit fa fa-thumbs-up" :parentid="item.parentId" :commentid="item.id" @click="likeit" :style="{color:(likearr.findindexof('c'+item.id)!==false?'orange':'#ccc')}"></i>
            <span style="font-size: 8px" :style="{visibility:(item.likeit>0?'visible':'hidden')}">({{item.likeit}})</span>
          </div>
        </li>
      </ul>
      <div class="more" >
        <i class="fa" :class="buttonType" @click="showMore"></i>
      </div>
      <div class="page" v-show="showMoreComments">
        <i class="fa fa-angle-double-left" @click="page=1"></i>
        <i class="fa fa-angle-left" @click="page==1?page=1:page-=1"></i>
        <input type="text" style="width: 15px;border: 1px solid #ccc" v-model="page">
        <span>/{{totalPage}}</span>
        <i class="fa fa-angle-right" @click="page==totalPage?page=totalPage:page+=1"></i>
        <i class="fa fa-angle-double-right" @click="page=totalPage"></i>
      </div>
     <!-- 清除浮动清除浮动-->
      <div style="clear: both"></div>
    </div>
</template>
<script>
  import cookie from '../js/cookie'
  export default {
    name:'commentList',
    props:['clist','fsize'],
    data(){
      return{
        showMoreComments:false,
        buttonType:'fa-angle-down',
        page:1
      }
    },
    computed:{
      likearr:function () {
       /* console.log(cookie.getCookie('likeit'))*/
        return cookie.getCookie('likeit')===null?[]:cookie.getCookie('likeit').split(',')
      },
      totalPage:function(){
        if(this.clist!==null)
          return Math.ceil(this.clist.length/5)

      }
    },
    methods:{
      content:function (oldval) {

        let oldvalArr=oldval.split('')
        let len=0;
        let start=0;
        let newval=``
        oldvalArr.forEach((item,index)=>{
          if(/^[^\u0000-\u00ff]$/.test(item))
            len+=2;
          else
            len++;
          if(len>=24) {
            newval +=(oldval.substring(start,index)+"\n")
            start=index
            len=0
          }
        })
        newval+=oldval.substring(start,oldval.length)
        return newval
      },
      showMore:function () {
        if(this.buttonType=='fa-angle-down'){
          this.buttonType='fa-angle-up';
          this.showMoreComments=true
        }else{
          this.buttonType='fa-angle-down';
          this.showMoreComments=false
        }
      },
      likeit:function () {
        let el = event.target
        let danmuId = event.target.getAttribute('commentid')
        let pId=el.getAttribute('parentId')
        if (el.style.color === 'orange') {
          this.$ajax.post('cancelLike',{danmuid:'c'+danmuId}).then(res=>{
            if(res.status===200){
              this.$store.state.danmuObjs.forEach(function (v, k) {
                if (v['id'] == pId)
                  /*v['likeit'] = res.data.number*/
                {
                  v['commentid'].forEach((item,index)=>{
                    if(item['id']==danmuId) {
                      item['likeit'] = res.data.number;
                    }
                  })
                }
              })
              //设置cookie，1小时只能给一条留言点一次赞

              let likestr = cookie.getCookie('likeit')
              let likearr=likestr.split(',')
              let index=likearr.findindexof('c'+danmuId)
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
          this.$ajax.post('/likeit', {danmuid: 'c'+danmuId}).then(res => {
            if (res.status === 200) {

              this.$store.state.danmuObjs.forEach(function (v, k) {
                if (v['id'] == pId)
                /*v['likeit'] = res.data.number*/
                {
                  v['commentid'].forEach((item,index)=>{
                    if(item['id']==danmuId) {
                      item['likeit'] = res.data.number;
                    }
                  })
                }
              })
              //设置cookie，1小时只能给一条留言点一次赞

              let likearr = cookie.getCookie('likeit')
              if (likearr === null)
                cookie.SetCookie('likeit', 'c'+danmuId)
              else
                cookie.SetCookie('likeit', likearr + ',' + 'c'+danmuId)


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
      },
      showComment:function (index,flag,page) {
        if(index<1 && !flag)
          return true
        else{
          if(flag){
            if(index<page*5 && index>=(page-1)*5)
              return true
          }
        }
        return false
      }
    }

  }
</script>
<style scoped>
  #commentList{

    float: right;
    width: 80%;
    border: 1px solid #ccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 10px;
    font-size: 16px;
    position: relative;
  }
  ul{
    list-style: none;
    width: 90%;
    float: left;
   /* position: absolute;*/
    min-height: 18px;
  }
  li{
    width: 100%;
    padding-left: .5em;
    border-bottom: 1px dashed #ccc;
    position: relative;
  }
  li p{
    font-weight: bold;
    color: cadetblue;
    text-indent: 1em;
    text-align: left;
    line-height: 18px;
    /*max-width: 200px;
    width: 100%;*/
    width: 200px;
    word-break: break-all;
    word-wrap: break-word;

  }
  .more{
    width: 10%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .more i{
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform:translate(-50%,-50%);
    left: 50%;
  }
  .likeit{
    cursor: pointer;

  }
  .likeitdiv{

    position: absolute;
    right: 10px;
    top:0;
  }
  .page{
    color:#666;
    line-height: 30px;
    box-sizing: border-box;
   /* padding: 5px 0;*/
   height: 30px;
    float: right;
   margin: 0 auto;
    margin-right: 20px;
  }
  .page i{
    cursor: pointer;
  }
</style>

