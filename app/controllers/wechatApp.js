//微信客户端登录
var initWechat = require('./initWechat');
var config = initWechat.config, api = initWechat.api, oauth = initWechat.oauth;
var KaAPI = require('../ka-api');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var param = {
     debug: false,
     jsApiList: [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ],
     url: config.domain+'/wechat/login/'
  };

//微信webAPP登陆
exports.login = function(req,res){
    console.log('login');
    if(req.cookies.openid){ 
    console.log(req.cookies.openid);
     KaAPI.getUserByWxID({strWXID : req.cookies.openid},function(err,data){
       		if(err)
       			res.end('网络出错');
       		console.log("用户信息："+data);
          if(data.result){
              res.cookie('strUserName',data.result);
          }
          if(data.result2){
              res.cookie('strPushID',data.result2);
          }
        		
       		api.getJsConfig(param, function (err,result) {
		        res.cookie('appId',result.appId);
		        res.cookie('timestamp',result.timestamp);
		        res.cookie('nonceStr',result.nonceStr);
		        res.cookie('signature',result.signature);
		        res.cookie('jsApiList',result.jsApiList);
		        res.end(appTpl());
    		});   
       }); 
     
    }else{  
      //没有openid,进行授权登陆
       console.log('重定向页面');
       res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc11926e87fca4c33&redirect_uri=http%3A%2F%2Fapp.kapark.cn%2Fwechat%2Fcallback&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect');
       res.end();
    }

};

//生成授权登陆的链接
exports.oauth = function(req, res){
      res.writeHead(200);
      var redirect = config.domain+'/wechat/callback';
      var authorizeURL = oauth.getAuthorizeURL(redirect, 'state', 'snsapi_userinfo')
      res.end(authorizeURL);
};

var APPCLIENT_DIR = path.join(__dirname,'..','..','appclient','app');
var appTpl = ejs.compile(fs.readFileSync(path.join(APPCLIENT_DIR,'index.html'), 'utf-8'));
exports.callback = function (req, res) {
        oauth.getAccessToken(req.query.code, function (err, result) {
          if(result && result.data){
             var accessToken = result.data.access_token;
             var openid = result.data.openid;
             res.cookie('openid',openid,{path:"/wechat",maxAge:12*30*24*60*60*1000});
             oauth.getUser(openid,function(err,_result){     
                  var headimgurl = _result.headimgurl	;	 
              		res.cookie('headimgurl',headimgurl,{path:"/wechat",maxAge:30*24*60*60*1000});
             		res.redirect('login/');
                    res.end();
              	}
             );

          }else{
              console.log('code unvalid');
              res.end();
          }         

  });
};