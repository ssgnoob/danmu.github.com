let mysql= require('mysql');

let pool  = mysql.createPool({
  host:'101.132.116.22',
  user:'ssg',
  password:'shi753951',
  database:'danmu',
  port:3306,
});


let mysqlop= {
         /* get:function(){
          conn.connect()

          conn.query('SELECT * from normalChat', function (err, rows, fields) {
            if (err) throw err;
            console.log(rows[0]);
          });

          conn.end();
        }*/
         insertDanmu:function (obj,type,callback) {
           /*fontSize:24,
             color:'#000',
             fontFamily:'黑体',
             speed:100,
             speedMode:'linear',
             opacity:1,
             danmuHeight:20,
             content:"施森钢大帅哥！"*/
           if(type===1) {
             pool.getConnection(function(err, conn) {
             conn.query(`INSERT INTO normalChat
                      (fontSize, color,backgroundColor,fontFamily, speed, speedMode, opacity, danmuHeight,content,createdon)
                        VALUES ('${obj.fontSize}','${obj.color}','${obj.backgroundColor}','${obj.fontFamily}','${obj.speed}',
                                '${obj.speedMode}','${obj.opacity}','${obj.danmuHeight}','${obj.content}','${obj.createdOn}')
                      `,function (err,result) {
               "use strict";
               conn.release()
               if(err) callback(err);
               else
                 callback(result.serverStatus)
             })


           })
           }
           else if(type===2){
             pool.getConnection(function(err, conn) {
             conn.query(`INSERT INTO privateChat
                      (userid,fontSize, color,backgroundColor,fontFamily, speed, speedMode, opacity, danmuHeight,content,createdon)
                        VALUES (${obj.userid},'${obj.fontSize}','${obj.color}','${obj.backgroundColor}','${obj.fontFamily}','${obj.speed}',
                                '${obj.speedMode}','${obj.opacity}','${obj.danmuHeight}','${obj.content}')
                      `,function (err,rows,fields) {
               "use strict";
               conn.release()
               if(err) throw err;
               else
                 return 1
             })


           })
           }

         },
         selectDanmu:function (userid,callback) {

            /*conn.connect()*/
           if(userid===0){
             pool.getConnection(function(err, conn) {
              conn.query('select * from normalChat',function (err,results) {
               conn.release()
                if(err) callback(err);
                callback(results)
              })
           })
           }
           else {

           }

         },
          selectComment:function (callback) {
            pool.getConnection(function(err, conn) {
              conn.query('select * from comment order by parentId,likeit desc,createdon desc',function (err,rows) {
                conn.release()
                if(err) callback(500);
                callback(rows)
              })
            })
          },
          creatComment:function (id,content,createdon,callback) {

            pool.getConnection(function(err, conn) {
              conn.query(`insert into comment(content,createdon,likeit,parentId)
                           values('${content}','${createdon}',0,${id})`,function (err,results) {

                if(err) callback(err);
                else{
                  conn.query('select * from comment where parentId='+id+' order by likeit desc,createdon desc',function (err,rows) {
                    "use strict";
                    if(err) callback(err)
                      callback({state:true,rows:rows})
                  }
                  )
                }
              })
            })
          },
          likeIt:function (danmuId,callback) {
           pool.getConnection(function(err, conn) {
             if(danmuId[0]==='c'){
               danmuId=danmuId.slice(1,danmuId.length)
               conn.query('update comment set likeit=likeit+1 where id='+danmuId,(err,results)=>{
                 "use strict";
                 if(err)
                   callback(err);
                 else{
                   conn.query('select likeit from comment where id='+danmuId,(err,rows)=>{
                     conn.release()
                     if(err)
                       callback(err)
                     else
                       callback(rows[0].likeit)
                   })
                 }
               })
             }else{
             conn.query('update normalChat set likeit=likeit+1 where id='+danmuId,function (err,results) {

               if(err)
                  callback(err);
                else{
                  conn.query('select likeit from normalChat where id='+danmuId,function (err,rows) {
                    conn.release()
                    if(err)
                      callback(err)
                    else
                      callback(rows[0].likeit)
                  })
               }

             }
           )}
           })
         },
          cancelLike:function (danmuId,callback) {
            pool.getConnection(function(err, conn) {
              if(danmuId[0]==='c'){
                danmuId=danmuId.slice(1,danmuId.length)
                conn.query('update comment set likeit=likeit-1 where id='+danmuId,(err,results)=>{
                  "use strict";
                  if(err)
                    callback(err);
                  else{
                    conn.query('select likeit from comment where id='+danmuId,(err,rows)=>{
                      conn.release()
                      if(err)
                        callback(err)
                      else
                        callback(rows[0].likeit)
                    })
                  }
                })
              }
              else {
                conn.query('update normalChat set likeit=likeit-1 where id=' + danmuId, function (err, results) {

                  if (err)
                    callback(err);
                  else {
                    conn.query('select likeit from normalChat where id=' + danmuId, function (err, rows) {
                      conn.release()
                      if (err)
                        callback(err)
                      else
                        callback(rows[0].likeit)
                    })
                  }

                })
              }
            })
          }
}
  module.exports=mysqlop



