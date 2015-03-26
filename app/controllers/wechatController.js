//微信服务控制器

var wechatApp = require('./wechatApp');
var replyController = require('./replyController');
var menuController = require('./menuController');
var saleController = require('./salerController');

exports.index = replyController.index;

exports.callback = wechatApp.callback;
exports.login = wechatApp.login;
exports.oauth = wechatApp.oauth;

exports.setMenu = menuController.setMenu;

exports.addSaler= saleController.addSaler;




