//定义用户模块

var getAppsInfo = require('../../config/apps-info'); // 从外部加载app的配置信息
var appIds = getAppsInfo();
var https = require("https");
module.exports.getWechatUserInfo = function (req,res) {
	res.set({
					 "Access-Control-Allow-Origin": "*"
					,"Access-Control-Allow-Methods": "POST,GET"
					,"Access-Control-Allow-Credentials": "true"
					
	});	

    var getUserInfo = function(access_token, openid){
		var url = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid+"&lang=zh_CN";
		https.get(url, function(_res){

			_res.on('data',function(data){
				var result =  JSON.parse(data.toString());
				console.log(result);
				res.json(result);
			});

			_res.on('error',function(e){
					console.log(e.message)
			});

		});
	};

	var getAccess_token = function(req,res){
				var code = req.params.code
				var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appIds.appid+"&secret="+appIds.secret+"&code="+code+"&grant_type=authorization_code"
				https.get(url, function(_res){
					_res.on('data',function(data){
						//请求的数据是二进制类型的，原本是utf8格式，使用toString可以转字符串			
						var result =  JSON.parse(data.toString());	
						//res.json(result);
						getUserInfo(result.access_token, result.openid);
					});

					_res.on('error',function(e){
						console.log(e.message)
					})

				});	

		};
	
	var gotoMainUrl = function(){
		res.redirect('http://kapark:cn/?code=123');
	}

	getAccess_token(req,res);
};

module.exports.getOauthUrl = function(url, state, scope){
		var oauthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appIds.appid
						+"&redirect_uri="+url
						+"&response_type=code&scope="+scope
						+"&state="+state
						+"#wechat_redirect";
		console.log(oauthUrl);
		return oauthUrl;
};


