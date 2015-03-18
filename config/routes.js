//引入相关的控制器
var rsx = require('../app/controllers/rsx');
var user = require('../app/controllers/user');
module.exports = function  (app) {

	app.get('/',function(req,res){
		console.log("请求页面");
	})

	app.post('/rsx',rsx);

	app.get('/getUserInfo',user.getWechatUserInfo);

	app.get('/url',function(){
		user.getOauthUrl('http://kapark.cn','12','snsapi_userinfo');
	});
	

};