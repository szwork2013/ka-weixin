//app 入口文件

var express = require('express');
var path = require('path');
var port  = process.env.PORT || 4000;
var app = express();


// 设置数据库和视图层的连接

require('./config/routes')(app)

app.listen(port);
console.log('ka-weixin started on port' + port);