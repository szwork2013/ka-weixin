//引入相关的控制器
var rsx = require('../app/controllers/rsx');
var user = require('../app/controllers/user');
var kaWechat = require('../app/controllers/kaWechat');
module.exports = function  (app) {


	app.post('/rsx',rsx);
    //微信开发绑定的url,需要支持get和post,所以使用use
    app.use('/wechat/index',kaWechat.index);
    app.get('/wechat/login/',kaWechat.login);
    app.get('/wechat/app',kaWechat.app);
    app.get('/wechat/setmenu',kaWechat.setMenu);
	app.post('/getUserInfo',user.getWechatUserInfo);
    app.get('/wechat/recharge',kaWechat.recharge);
    app.get('/wechat/oauth',kaWechat.oauth);
    app.get('/wechat/callback',function  (req,res) {
       //出现两次请求的问题，在微信里打开没有问题，扫描二维码进入的就有问题
    	console.log('路由访问');
    	kaWechat.callback(req,res);
    });
	app.get('/url',function(){
		user.getOauthUrl('http://kapark.cn/#/index','12','snsapi_userinfo');
	});
    app.get('/wechat/setcookie',kaWechat.setCookie)


	

};