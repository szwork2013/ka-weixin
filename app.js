//app 入口文件

var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser')
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var port  = process.env.PORT || 80;
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'appclient/app')));
app.use(bodyParser.json());
app.use(express.query());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
// 设置数据库和视图层的连接
//app.all('*', function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  res.header("X-Powered-By",' 3.2.1')
//  res.header("Content-Type", "application/json;charset=utf-8"); 
//next();
//});
require('./config/routes')(app)

app.listen(port);
console.log('ka-weixin started on port' + port);