//微信服务控制器

var wechatApp = require('./wechatApp');
var replyController = require('./replyController');
var menuController = require('./menuController');
var saleController = require('./saleController');

exports.index = replyController.index;

exports.callback = wechatApp.callback;
exports.login = wechatApp.login;
exports.oauth = wechatApp.oauth;

exports.setMenu = menuController.setMenu;

exports.addSale = saleController.addSale;




