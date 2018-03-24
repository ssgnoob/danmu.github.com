import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
  danmuAttr:{
    fontSize:24,
    color:'#000',
    backgroundColor:'#fff',
    fontFamily:'黑体',
    speed:100,
    speedMode:'linear',
    opacity:1,
    danmuHeight:20
  },
  danmuObjs:[
    {
      id:0,
      fontSize:24,
      color:'#000',
      backgroundColor:'#fff',
      fontFamily:'黑体',
      speed:100,
      speedMode:'linear',
      opacity:1,
      danmuHeight:20,
      content:"如果你看到这条消息，那就说明服务器挂了！",
      commentId:'',
      likeit:'',
      createdOn:'2018-2-15'
    }
  ],
  show:false,
  newUser:false,
  userid:0
/*  backgroundColor:'#fff'*/
}
const mutations={
  changeDanmuAttr:function (state,payload) {
    state.danmuAttr[payload[0]]=payload[1]

  },
  sOh:function (state) {
    state.show=!state.show
  },
  dmp:function (state,payload) {
    state.danmuObjs.push(payload)
  },
  /*cbc:function (state,payload) {
    state.backgroundColor=payload
  }*/
  cnu:function (state) {
    state.newUser=true
  },
  dmc:function (state,payload) {
    state.danmuObjs=payload
  },
  dmoc:function (state,payload) {
    state.danmuObjs[payload.index][payload.obj]=payload.value
  }
}

const actions={
  changeAttr(context,payload){
    context.commit("changeDanmuAttr",payload)

  },
  showOrHide(context){
    context.commit("sOh")
  },
  danmuPush(context,payload){
    context.commit('dmp',payload)
  }/*changeColor(context,payload){
    context.commit('cbc',payload)
  }*/,
  createNewUser(context){
    context.commit('cnu')
  },
  newDanmuList(context,payload){
    context.commit('dmc',payload)
  },
  changeOneDanmuAttr({commit},payload){
    commit('dmoc',payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
