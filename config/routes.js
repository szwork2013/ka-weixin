//引入相关的控制器
var rsx = require('../app/controllers/rsx');
var user = require('../app/controllers/user');
var kaWechat = require('../app/controllers/kaWechat');
module.exports = function  (app) {

	app.get('/',function(req,res){
		console.log("请求页面");
	})

	app.post('/rsx',rsx);
    
    app.get('/wechat/index',kaWechat.index);
	app.post('/getUserInfo',user.getWechatUserInfo);

	app.get('/url',function(){
		user.getOauthUrl('http://kapark.cn/#/index','12','snsapi_userinfo');
	});
	

};