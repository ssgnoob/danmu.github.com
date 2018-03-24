
let cookie= {
  /*
   功能：保存cookies函数
   参数：name，cookie名字；value，值
   */
  SetCookie:function(name, value)
{

  let exp = new Date(); //获得当前时间
  exp.setTime(exp.getTime() +  60 * 60 * 1000); //换成毫秒
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
,
/*
功能：获取cookies函数
参数：name，cookie名字
*/
getCookie:function(name) {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
,
/*
功能：删除cookies函数
参数：name，cookie名字
*/

delCookie:function(name) {
  let exp = new Date(); //当前时间
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
}

export default cookie
