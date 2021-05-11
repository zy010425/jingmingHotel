//引入mysql模块
const mysql=require('mysql');
//创建连接对象
let pool=mysql.createPool({
    host:'127.0.0.1',
    port:'3307',
    user:'root',
    password:'',
    database:'hotel',
    connectionLimit:15,
   multipleStatements:true
});
//导出连接池对象
module.exports=pool;