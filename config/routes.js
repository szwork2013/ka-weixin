//引入相关的控制器
var rsx = require('../app/controllers/rsx');
module.exports = function  (app) {

	app.get('/',function(req,res){
		console.log("请求页面");
	})

	app.get('/rsx',rsx)

}