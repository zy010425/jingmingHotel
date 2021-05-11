//用户路由器，包含很多用户相关的路由
const express=require('express');
//引入连接池模块
const pool=require('../pool.js')
// //引入mysql模块
//创建路由器对象
let router=express.Router();
//挂载路由
//1.注册用户的路由，post方法   /reg
router.post('/reg',(req,res)=>{
      //获取表单数据
      let obj=req.body;
      //验证各项数据是否为空
      console.log(obj.uname)
      if(!obj.uname){
         res.send({code:401,msg:'用户名为空'});
         //阻止往下执行
         return;
      }
      if(!obj.email){
         res.send({code:401,msg:'邮箱为空'});
         //阻止往下执行
         return;
      }
      if(!obj.upwd){
        res.send({code:401,msg:'密码为空'});
        //阻止往下执行
        return;
     }
      if(!obj.r_upwd){
         res.send({code:401,msg:'请再次输入密码'});
         //阻止往下执行
         return;
      }
     
      pool.query('INSERT INTO user SET ?',[obj],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:200,msg:'注册成功'});
        }else{
         res.send({code:200,msg:'注册失败'});
        }
      });
});


//2.用户登录的路由，post方法   /login
router.post('/login',(req,res)=>{
   //获取表单数据
   let obj=req.body;
   //验证表单数据是否为空
   if(!obj.email){
     res.send({code:401,msg:'用户邮箱为空'});
     //阻止往下执行
     return;
  }
  if(!obj.upwd){
     res.send({code:402,msg:'密码为空'});
     //阻止往下执行
     return;
  }
  //执行SQL语句
  pool.query('SELECT*FROM user WHERE email=? AND upwd=?',[obj.email,obj.upwd],(err,result)=>{
      if(err) throw err;
      console.log(result);
      //返回的数组，如果查到相应的用户，数组中就会出现这数据，否则没查找到，返回空数组，登录失败。
      if(result.length>0){
         res.send({code:200,msg:'登录成功'});
      }else{
         res.send({code:301,msg:'登录失败'});
      }
  });
});


// 3.订购房间，post方法   /order 方法2
router.post('/order',(req,res)=>{
    //获取数据
    let obj=req.body;
    console.log(obj);
    //验证数据是否为空，遍历对象，访问每个属性，如果属性值为空，提示属性名那一栏是必须的
     let i=400; 
     let a=false;
    for(let key in obj){
        i++;
        console.log(key,obj[key]);//key属性名，obj[key]属性值
        if(!obj[key]){
            a=true;
          res.send({code:i,msg:key+'为空'});
          return;
       }
     }   
    //执行SQL语句
   pool.query('INSERT INTO user_order SET ?',[obj],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
        res.send({code:200,msg:'订购成功'});
    }else{
     res.send({code:301,msg:'订购失败'});
      }
    });
   });


// //3.用户订购的路由，post方法   /order
// router.post('/order',(req,res)=>{
//    //获取表单数据
//    let obj=req.body;
//    //验证表单数据是否为空
//    if(!obj.room_spec){
//      res.send({code:401,msg:'房间类型为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.count){
//      res.send({code:402,msg:'房间数量为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.uname){
//      res.send({code:402,msg:'用户姓名为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.gender){
//      res.send({code:402,msg:'用户性别为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.email){
//      res.send({code:402,msg:'邮箱为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.live_time){
//      res.send({code:402,msg:'入住时间为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.live_day){
//      res.send({code:402,msg:'入住天数为空'});
//      //阻止往下执行
//      return;
//   }
//   if(!obj.phone){
//      res.send({code:402,msg:'电话为空'});
//      //阻止往下执行
//      return;
//   }
//   //执行SQL语句
//   pool.query('INSERT INTO user_order SET ?',[obj],(err,result)=>{
//    if(err) throw err;
//    console.log(result);
//    if(result.affectedRows>0){
//        res.send({code:200,msg:'订购成功'});
//    }else{
//     res.send({code:200,msg:'订购失败'});
//    }
//  });
// });



//4.用户检索订单的路由，get方法   /detail
router.get('/detail',(req,res)=>{
   //获取数据
   let obj=req.query;
   console.log(obj);
   //验证是否为空
   if(!obj.email){
     res.send({code:401,msg:'邮箱为空'});
     //阻止往下执行
     return;
  }
   if(!obj.uname){
     res.send({code:401,msg:'姓名为空'});
     //阻止往下执行
     return;
  }
  //执行SQL语句
  pool.query('SELECT*FROM user_order WHERE email=? AND uname=?',[obj.email,obj.uname],(err,result)=>{
      if(err) throw err;
      console.log(result);
      // 返回的数组，如果查到相应的用户，数组中就会出现这数据，否则没查找到，返回空数组，登录失败。
      if(result.length>0){
         res.send({code:200,
            msg:'订单查看成功',
            data:result[0]
      });
      }else{
         res.send({code:301,msg:'订单查看失败'});
      }
  });
});

//5.修改用户信息，get方法   /update
router.get('/update',(req,res)=>{
   //获取数据
   let obj=req.query;
   console.log(obj);
   //验证数据是否为空，遍历对象，访问每个属性，如果属性值为空，提示属性名那一栏是必须的
    let i=400; 
   for(let key in obj){
       i++;
       console.log(key,obj[key]);//key属性名，obj[key]属性值
       if(!obj[key]){
         res.send({code:i,msg:key+'为空'});
      }
    }
   
   //执行SQL语句
  pool.query('UPDATE user SET  ? where email=?',[obj,obj.email],(err,result)=>{
   if(err) throw err;
   if(result.affectedRows>0){
       res.send({code:200,msg:'修改成功'});
   }else{
    res.send({code:200,msg:'修改失败'});
     }
   });
  });

  //6删除用户路由  get   /delete

   //获取数据
router.get('/delete',(req,res)=>{
   //验证数据是否为空，遍历数据库对象，访问每个用户，如果用户编号为空，提示用户编号为空
    let obj=req.query;
      console.log(obj);
      //验证是否为空
      if(!obj.email){
        res.send({code:401,msg:'用户记录为空'});
        //阻止往下执行
        return
     }
   
     pool.query(' DELETE FROM user WHERE  email=? ',[obj.email],(err,result)=>{
      if(err) throw err;
      //返回的数组，如果数组长度大于0，这查询到用户，否则查询不到。
      if(result.affectedRows>0){
          res.send({
            code:200,
            msg:'用户注销成功'
         });
      }else{
       res.send({code:301,msg:'用户注销失败'});
        }
      });
     });

     7//用户列表  get /list
router.get('/list',(req,res)=>{
   //获取数据
   let obj=req.query;
   console.log(obj);
   //验证是否为空 用默认值来实现
   if(!obj.pno) obj.pno=1;
   if(!obj.count) obj.count=2;
   //将count转为整形
   obj.count= parseInt(obj.count);
   //计算 start
   let start=(obj.pno-1)*obj.count;
   //执行查询
   pool.query('SELECT * FROM user limit ?,?',[start,obj.count],(err,result)=>{
       if(err)  throw err;
       console.log(result);
       //返回的数组，如果数组长度大于0，则查询到用户，否则查询不到。
       if(result.length>0){
           res.send({
               code:200,
               msg:'用户查询成功',
               data:result
           });
       }else{
           res.send({code:301,msg:'用户查询失败'});
       }
      });


});

//导出路由器对象
module.exports = router;