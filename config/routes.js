//引入相关的控制器
var rsx = require('../app/controllers/rsx');
var user = require('../app/controllers/user');
var kaWechat = require('../app/controllers/kaWechat');
module.exports = function  (app) {

	app.get('/',function(req,res){
		console.log("请求页面");
	})

	app.post('/rsx',rsx);

    //微信开发绑定的url,需要支持get和post,所以使用use
    app.use('/wechat/index',kaWechat.index);
    app.get('/wechat/login',kaWechat.login);
    app.get('/wechat/setmenu',kaWechat.setMenu);
	app.post('/getUserInfo',user.getWechatUserInfo);
    app.get('/wechat/recharge',kaWechat.recharge);
	app.get('/url',function(){
		user.getOauthUrl('http://kapark.cn/#/index','12','snsapi_userinfo');
	});
	

};