const express=require('express');
const bodyparser=require('body-parser');
const userRouter=require('./routes/user.js');//引入用户路由器
const productRouter=require('./routes/product.js');//引入商品路由器
const product_conRouter=require('./routes/product_con.js');//引入商品管理路由器
const indexRouter=require('./routes/index.js');//引入主页路由器
//创建web服务器↓
let app=express();
app.listen(80);

//托管静态资源(html,css,js图像)
app.use(express.static('public'));//内置中间件
//第三方中间件↓主体解析
app.use(bodyparser.urlencoded({
    extended:false //使用核心模块querystring,不使用第三方模块qs
}));
//把用户路由器挂载到服务器  给url添加前缀/user
app.use('/user',userRouter);
// //把商品路由器挂载到服务器  给url添加前缀/user
app.use('/product',productRouter);
// //把商品管理路由器挂载到服务器  给url添加前缀/user
app.use('/product_con',product_conRouter);
// //把主页路由器挂载到服务器  给url添加前缀/user
app.use('/index',indexRouter);
