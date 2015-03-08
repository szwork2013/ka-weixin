/*
* 获取数字签名的控制器
*/
var  utils = require('../utils');
module.exports = function (req,res) {
	console.log('request');
	utils.rsx(req,res);
}