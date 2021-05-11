//用户路由器，包含很多用户相关的路由
const express=require('express');
//引入连接池模块
const pool=require('../pool.js')
// //引入mysql模块
//创建路由器对象
let router=express.Router();
//挂载路由


//1.用户检索房型的路由，get方法   /pdetail




// router.get('/pdetail',(req,res)=>{
//     //获取数据
//     let obj=req.query;
//     console.log(obj);
//     //验证是否为空
//     if(!obj.type_name){
//       res.send({code:401,msg:'房型不存在'});
//       //阻止往下执行
//       return;
//    }
   
//    //执行SQL语句
//    pool.query('SELECT*FROM room_type WHERE type_name=? ',[obj.type_name],(err,result)=>{
//        if(err) throw err;
//        console.log(result);
//        // 返回的数组，如果查到相应的房型，数组中就会出现这数据，否则没查找到，返回空数组，登录失败。
//        if(result.length>0){
//           res.send({code:200,
//              msg:'搜索房型成功',
//              data:result[0]
//        });
//        }else{
//           res.send({code:301,msg:'房型搜索失败'});
//        }
//    });
//  });


//多表查询尚有问题！！！！！！
 router.get("/pdetail", (req, res) => {
   let obj = req.query;
   if (!obj.type_name) {
       res.send({
           code: 401,
           msg: "房型不存在"
       });
       return;
   };
   let sql = `
             SELECT type_name FROM room_type INNER JOIN room ON room_type.type_name = room_type.tid WHERE room.r_type = ?;`;
    
   pool.query(sql, [obj.tid, obj.r_type], (err, result) => {
       if (err) throw err;
       if (result.length > 0) {
           result[2][0].laptopList = result[3];
           res.send({
               code: 200,
               msg: "房型搜索成功",
               details: result[0][0],
               picList: result[1],
               family: result[2][0]
           })
       } else {
           res.send({
               code: 301,
               msg: "房型搜索失败"
           })
       }

   })
})
 //导出路由器对象
module.exports = router;