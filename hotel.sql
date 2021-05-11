#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS hotel;
#创建新的数据库，设置编码
CREATE DATABASE hotel CHARSET=UTF8;
#进入创建的数据库
USE hotel;

/**房间信息**/
CREATE TABLE room(
  rid INT PRIMARY KEY AUTO_INCREMENT,
  r_type INT,           #房型 ：标准房，大床房、双人房、特价房
  price double,        #价格
  is_wifi BOOLEAN,           #有无WiFi
  is_window BOOLEAN,           #有无窗户
  is_food BOOLEAN,         #是否含早餐
  is_pet BOOLEAN,           #是否可携带宠物
  room_size VARCHAR(32),    #房间的大小
  bed_size VARCHAR(32),     #床的大小
  live_people INT,             #限住几人
  room_number VARCHAR(4),      #房间号
  is_blankroom BOOLEAN       #是否还有空房
)AUTO_INCREMENT=100;

/**房间类型**/
CREATE TABLE room_type(
 tid INT PRIMARY KEY AUTO_INCREMENT,
 type_name VARCHAR(8)    #房型名称：标准房，大床房、双人房、特价房
);


/**用户信息**/
CREATE TABLE user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  r_upwd VARCHAR(32),
  email VARCHAR(64)
);

/**购物车条目**/
CREATE TABLE hotel_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,      #用户编号
  order_spec VARCHAR(64),      #选购的房型
  count INT,        #订购房间数量
  live_time BIGINT,    #入住时间
  is_checked BOOLEAN  #是否已勾选，确定购买
  #FOREIGN KEY (order_spec) REFERENCES room_type(tid)    #外键连接
);

/**用户订单**/
CREATE TABLE user_order(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  room_spec VARCHAR(32),           #房间类型
  count INT,                 #订购房间数量
  uname VARCHAR(32),     #用户姓名
  gender INT,                #用户性别  0-女  1-男
  email VARCHAR(64),	     #用户邮箱	     
  live_time BIGINT,          #入住时间
  live_day BIGINT,           #居住天数
  phone  INT                 #用户电话
)AUTO_INCREMENT=1000;

/**酒店图片**/
CREATE TABLE hotel_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(128)            #图片路径
)AUTO_INCREMENT=10000;


/**插入房间类型**/

INSERT INTO room_type VALUES
(1,'标准单人房'),
(2,'标准双人房'),
(3,'标准大床房'),
(4,'商务单人房'),
(5,'商务双人房'),
(6,'商务大床房'),
(7,'超值特价房');

/**插入酒店信息**/
INSERT INTO room VALUES
(NULL, '1', '128', '1', '0','0','0', '20㎡', '1.2m*2m', '1','201','1'),
(NULL, '2', '168', '1', '1','0','1', '28㎡', '1.2m*2m', '1','202','1'),
(NULL, '3', '158', '1', '1','0','1', '26㎡', '1.8m*2m', '1','203','1'),
(NULL, '4', '148', '1', '1','1','1', '26㎡', '1.6m*2m', '1','301','1'),
(NULL, '5', '188', '1', '1','1','1', '32㎡', '1.6m*2m', '1','302','1'),
(NULL, '6', '178', '1', '1','1','1', '32㎡', '1.8m*2m', '1','303','1'),
(NULL, '7', '88', '0', '0','0','0', '16㎡', '1.2m*2m', '1','204','1');


/**插入用户信息**/
INSERT INTO user VALUES
(NULL, 'wenwen', '20010119', '20010119','0119@qq.com'),
(NULL, 'pingping', '20010115', '20010115','0115@qq.com'),
(NULL, 'zhouzhou', '20010425', '20010425','0425@qq.com');


/**插入用户订单信息**/
INSERT INTO user_order VALUES
(NULL, '标准大床房','2','wenwen','0','0119@qq.com','20210420','1','17845987852'),
(NULL, '商务大床房','1','pingping','0','0115@qq.com','20210425','3','17845987852'),
(NULL, '商务双人房','1','zhouhzhou','0','0425@qq.com','20210425','2','17845987852');




/**插入购物车信息**/
INSERT INTO hotel_shoppingcart_item VALUES
(NULL,'1001','3','1','20210420','1'),
(NULL,'1003','6','1','20210425','0');

INSERT INTO hotel_pic VALUES
(NULL,'<img src="logo.jpg" width="170" height="60" border="0" alt="">'),
(NULL,'<img src="logo.jpg" width="170" height="60" border="0" alt="">');