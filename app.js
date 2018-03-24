let express= require('express')
/*let ejs  =require('ejs');*/
let bodyParser = require('body-parser');
let cors = require('cors');
let app=express()
let mysqlop=require('./mysqlop')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
/*
console.log(mysqlop.get())*/

app.post('/newDanmu', function (req, res) {
  /*res.sendFile(__dirname+'\\index.html')*/
  /*console.log(req.body.danmu)*/
  let danmu =req.body.danmu
  let type=req.body.type
  res.set("Access-Control-Allow-Origin", "*");
  mysqlop.insertDanmu(danmu,type,function (msg) {

    if(msg===2)
      res.sendStatus(200)
    else
      res.send(msg)
  })

});
app.post('/toComment',(req,res)=>{
  "use strict";
  res.set("Access-Control-Allow-Origin", "*");
  let id=req.body.comment.toId
  let content=req.body.comment.content
  let createdon=req.body.comment.createdon
  mysqlop.creatComment(id,content,createdon,results=>{
      if(results.state)
        res.status(200).json({comment:results.rows})
      else
        res.status(200).json({'error':msg})
  })
})
app.get('/getComment',(req,res)=>{
  "use strict";
  /*console.log(commentArr)*/
  res.set("Access-Control-Allow-Origin", "*");
  let getArr=[]
  mysqlop.selectComment((results)=>{
    if(results!==500) {
      getArr = results
      res.status(200).json({comments:getArr})
    }else
      res.status(500).json({'error':msg})

  })

  /*commentArr.forEach((v,k)=>{
    if(v['commentid'].length!==0)

  })*/
})

app.post('/likeit',function(req,res){

  res.set("Access-Control-Allow-Origin", "*");
  res.set('Access-Control-Allow-Methods',"GET, POST,OPTIONSs")
  let danmuid=req.body.danmuid
 /* res.set('Access-Control-Request-Headers','')*/
  mysqlop.likeIt(danmuid,function (msg) {
      if(typeof(msg)==="number"){
        res.status(200).json({number:msg})

      }else
        res.status(500).json({'error':msg})
  })

})
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.post('/cancelLike',function(req,res){
  let danmuid=req.body.danmuid
  res.set("Access-Control-Allow-Origin", "*");
  mysqlop.cancelLike(danmuid,function (msg) {
    if(typeof(msg)==="number"){
      res.status(200).json({number:msg})

    }else
      res.status(500).json({'error':msg})
  })

})
app.get('/',function (req,res) {
  res.set("Access-Control-Allow-Origin", "*");
  /*res.status(200).send('hello!')*/
  res.sendFile(__dirname+'/index.html')
})

app.get('/getDanmu',function (req,res) {
  res.set("Access-Control-Allow-Origin", "*");
  if(req.query.type==='1'){
      mysqlop.selectDanmu(0,function (msg) {
        if(msg==='2')
          res.sendStatus(200)

          res.send(msg)
      })
  }
  else if(req.query.type===2){

  }else{

  }
})
/*console.log(__dirname+'\\index.html')*/
/*app.set('views',__dirname)
app.engine('.html',ejs.__express)
app.set('view engine','html')*/
/*app.set('src', './client/view');
app.set('view engine', 'html');*/


// 静态文件配置
app.use(express.static(__dirname))

app.use(cors({
  origin:['*'],
  methods:['GET','POST'],
  alloweHeaders:['Content-Type', 'Authorization']
}));
let server = app.listen(3000, function(){
  console.log(server.address())
  let host = server.address().address;
  let port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
