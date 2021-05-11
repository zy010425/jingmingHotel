const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//1.添加购物车
router.get('/add',(req,res)=>{
    var obj=req.query;
    var $rid=obj.rid;//
    var $buyCount=obj.count;//
    if(!obj.rid){//
        res.send({code:401,msg:'rid required'});
        return;
    }
    if(!obj.count){//
        res.send({code:402,msg:'count required'});
        return;
    }
    if(!req.session.loginUid){
        req.session.pageToJump='listing.html';
        req.session.toBuyrid=obj.rid;
        req.session.tocount=obj.count;
        res.send({code:300,msg:'login required'});
        return;
    }
    var sql=`SELECT iid FROM hotel_shoppingcart_item WHERE uid=? AND order_spec=?`;
    pool.query(sql,[req.session.loginUid,$lid],(err,result)=>{
        if(err) throw err;
        var sql2;
        if(result.length>0){
            sql2=`UPDATE hotel_shoppingcart_item SET count=count+1 WHERE user_id=${req.session.loginUid} AND order_spec=${$rid}`;

        }else{
            sql2=`INSERT INTO hotel_shoppingcart_item VALUES(NULL, ${req.session.loginUid}, ${$rid}, ${$buyCount}, false)`;
        }
        pool.query(sql2,(err,result2)=>{
            if(err) throw err;
            if(result2.affectedRows>0){
                res.send({code:200,msg:'购物车添加成功'});
            }else{
                res.send({code:500,msg:'购物车添加失败'});
            }
        });
    });
});
//2.购物车列表
router.get('/list',(req,res)=>{
    var output={};
    if(!req.session.loginUid){
        req.session.pageToJump='cart.html';
        res.send({code:300,msg:'login required'});
        return;
    }
    var sql='SELECT iid,lid,title,spec,price,count FROM xz_laptop l, xz_shoppingcart_item s WHERE l.lid=s.product_id AND user_id=?';
    pool.query(sql,[req.session.loginUid],(err,result)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        if(err) throw err;
        output.code=200;
        output.data=result;
        for(var i=0;i<output.data.length;i++){
            var lid=output.data[i].lid;
            (function(lid,i){
              pool.query('SELECT sm FROM xz_laptop_pic WHERE laptop_id=? LIMIT 1',[lid],(err,result)=>{
                output.data[i].pic=result[0].sm;
              });
            })(lid,i);
        }
        setTimeout(() => {
            res.send(output);
        }, 100);
    });
});
//3.删除购物车
router.get('/del',(req,res)=>{
    var obj=req.query;
    if(!obj.iid){
        res.send({code:401,msg:'iid required'});
        return;
    }
    if(!req.session.loginUid){
        res.send({code:300,msg:'login required'});
        return;
    }
    pool.query('DELETE FROM xz_shoppingcart_item WHERE iid=?',[obj.iid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'delete succ'});
        }else{
            res.send({code:500,msg:'delete err'});
        }
    });
});


module.exports=router;