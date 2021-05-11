const express = require("express"),
    router = express.Router(),
    pool = require("../pool.js");

//1房型列表
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
    pool.query('SELECT * FROM room limit ?,?',[start,obj.count],(err,result)=>{
        if(err)  throw err;
        console.log(result);
        //返回的数组，如果数组长度大于0，则查询到用户，否则查询不到。
        if(result.length>0){
            res.send({
                code:200,
                msg:'房型列表查询成功',
                data:result
            });
        }else{
            res.send({code:301,msg:'房型列表查询失败'});
        }
       });
 
 
 });
//2房型详情
router.get("/detail", (req, res) => {
    let obj = req.query;
    if (!obj.lid) {
        res.send({
            code: 401,
            msg: "lid required"
        });
        return;
    };
    let sql = `SELECT * FROM xz_laptop WHERE lid=?;
               SELECT pid,laptop_id,sm,md,lg FROM xz_laptop_pic WHERE laptop_id=?;
               SELECT fid,fname FROM xz_laptop_family INNER JOIN xz_laptop ON xz_laptop_family.fid = xz_laptop.family_id WHERE xz_laptop.lid = ?;
               SELECT lid,spec FROM xz_laptop WHERE family_id IN (SELECT family_id FROM xz_laptop WHERE lid = ?); `;
    pool.query(sql, [obj.lid, obj.lid, obj.lid, obj.lid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            result[2][0].laptopList = result[3];
            res.send({
                code: 200,
                msg: "detail ok",
                details: result[0][0],
                picList: result[1],
                family: result[2][0]
            })
        } else {
            res.send({
                code: 301,
                msg: "can not found"
            })
        }

    })
})
//3删除房型
router.get("/delete", (req, res) => {
    let obj = req.query;
    if (!obj.rid) {
        res.send({
            code: 401,
            msg: "删除失败"
        })
    }
    pool.query("delete from room where rid=?", [obj.rid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: "删除成功"
            });
        } else {
            res.send({
                code: 301,
                msg: "删除失败"
            });
        }
    })
})
//4增加房型
router.post('/add',(req,res)=>{
    //获取数据
    let obj=req.body;
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
    
// router.post("/add", (req, res) => {
//     let obj = req.query;
//     let temp = 400;
//     for (let key in obj) {
//         temp++
//         if (!obj[key]) {
//             res.send({
//                 code: temp,
//                 msg: "添加失败"
//             });
//             return;
//         }
//     }
    pool.query("insert into room (r_type,price,is_wifi,is_window,is_food,is_pet,room_size,bed_size,live_people,room_number,is_blankroom) values (?,?,?,?,?,?,?,?,?,?,?)", [obj.r_type,obj.price,obj.is_wifi,obj.is_window,obj.is_food,obj.is_pet,obj.room_size,obj.bed_size,obj.live_people,obj.room_number,obj.is_blankroomrr] , (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                code: 301,
                msg: "添加失败"
            })
        }

    })
})

module.exports = router;