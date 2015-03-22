/*
**定义微信入口模块
*/
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var config = {
  token: 'weixin',
  appid: 'wxc11926e87fca4c33',
  encodingAESKey: 'fAEBTD5FYRZp0GVuiTH7YBkHVNsXE94yWyA56ayqPxC',
  secret: "3d9fd4a4e62b392166cfe7600ee07d17",
  domain: "http://kapark.cn"   //开发环境域名 "http://120.24.84.180"
};

var oauth = new wechat.OAuth(config.appid, config.secret,function (openid, callback) {
  // 传入一个根据openid获取对应的全局token的方法
  fs.readFile('./config/user_access_token/' + openid +'.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (openid, token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  // 持久化时请注意，每个openid都对应一个唯一的token!
  fs.writeFile('./config/user_access_token/' + openid + '.txt', JSON.stringify(token), callback);
});

var api = new WechatAPI(config.appid, config.secret, function (callback) {
  // 传入一个获取全局token的方法
  fs.readFile('./config/access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  fs.writeFile('./config/access_token.txt', JSON.stringify(token), callback);
});

api.registerTicketHandle(function (type,callback) {
  // 传入一个获取全局token的方法
  fs.readFile('./config/ticket_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (type, ticketToken, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  fs.writeFile('./config/ticket_token.txt', JSON.stringify(ticketToken), callback);
});


exports.index = wechat(config, wechat.text(function (message, req, res) {
  console.log(message);
  var input = (message.Content || '').trim();
  var from = message.FromUserName;
  if (input === 'login') {
    res.reply([{
      title: '登陆页面',
      description: '去登陆',
      picurl: config.domain + '/assets/qrcode.jpg',
      url: config.domain + '/login'
    }]);
    return;
  }

  if (input === '大王') {
    return res.reply("不要叫我大王，要叫我女王大人啊……");
  }
}).image(function (message, req, res) {
  console.log(message);
}).location(function (message, req, res) {
  console.log(message);
  res.reply('位置');
}).voice(function (message, req, res) {
  console.log(message);
  res.reply('语音');
}).link(function (message, req, res) {
  console.log(message);
  res.reply('链接');
}).event(function (message, req, res) {
  console.log(message);
  if (message.Event === 'subscribe') {
    // 用户添加时候的消息
    //http://www.cnblogs.com/txw1958/p/weixin-qrcode-with-parameters.html
    var content = "感谢您关注互助停车。互助，让停车更轻松\n！"+
				  "我们现与方圆月岛停车场进行深入合作，为周边用户解决停车难这个大问题。一键下载安卓版APP，车主立即解决当前问题，业主也能轻松分享空闲车位帮助别人。\n"+
				   "即日起到3月31日，我们平台将推出如下优惠活动\n"+
				   "①新注册用户首次停车首半小时租金次日返还\n"+
				   "②充值每50元赠送10元（赠送金额次日到账，不能提现）\n"
                   "现阶段App Store尚在审核苹果版本，微信端功能即将开放，敬请期待！";
    var scene_id = message.EventKey; //推广员id
    var from = message.FromUserName; //用户openid
    if(scene_id){
    	//对场景ID进行处理，绑定业务员
    }
    res.reply(content);
  } else if (message.Event === 'scan') {
  	//已关注
    res.reply('扫描'+message.EventKey);
  } else if (message.Event === 'unsubscribe') {
    res.reply('Bye!'); 
  } else if (message.Event === 'CLICK') {
    // var content = '';
    // switch(message.EventKey){
    //     case 'recharge': content = "充值客服：&lt;a href=&quot;weixin://contacts/profile/linzehuan_&quot;&gt;StartOne&lt;/a&gt;";break;
    //     default: content = 'click类型不存在';
    //   };
    // content =  '充值客服：<a href="http://kapark.cn/wechat/recharge">1. 点击记录团队充值</a>';
    // res.reply(content); 
    var mediaId = "n7pKJcMZC15Ng9-PU87lflwco9wLDvWdhpQtQX9Z2SCAq73MnIkVj76gPZfwJb0z";
        res.reply({
          type: 'image',
          content: {
            mediaId: mediaId
          }
        });
  } else {
    res.reply('暂未支持! Coming soon!');
  }
}));

//微信JS的调用
var param = {
     debug: true,
     jsApiList: [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
                    'onMenuShareWeibo'
          ],
     url: 'http://kapark.cn/wechat/login/'
  };

//微信webAPP登陆
exports.login = function(req,res){
    console.log('login');
    //获取最新的js sdk 配置 传给前台
      //有openid
    if(true){  //req.cookies.openid
     api.getJsConfig(param, function (err,result) {
       console.log(result);
       res.cookie('appId',result.appId);
       res.cookie('timestamp',result.timestamp);
       res.cookie('nonceStr',result.nonceStr);
       res.cookie('signature',result.signature);
       res.cookie('jsApiList',result.jsApiList);
       res.end(appTpl({text:config.appid}));
     });   
    }else{  
      //没有openid,进行授权登陆
       console.log('重定向页面');
       res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc11926e87fca4c33&redirect_uri=http%3A%2F%2Fkapark.cn%2Fwechat%2Fcallback&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect');
       res.end();
    }

};

//生成授权登陆的链接
exports.oauth = function(req, res){
  res.writeHead(200);
  var redirect = 'http://kapark.cn/wechat/callback';
  var authorizeURL = oauth.getAuthorizeURL(redirect, 'state', 'snsapi_userinfo')
  res.end(authorizeURL);
}

  var APPCLIENT_DIR = path.join(__dirname,'..','..','appclient','app');
  var appTpl = ejs.compile(fs.readFileSync(path.join(APPCLIENT_DIR,'index.html'), 'utf-8'));

exports.callback = function (req, res) {
  //重定向不能设置请求头
  //res.writeHead(200);
  console.log('进入callback: code='+req.query.code);
  oauth.getAccessToken(req.query.code, function (err, result) {
    console.log('获取accessToken\n');
    console.log(result);
    if(result && result.data){

       var accessToken = result.data.access_token;
       var openid = result.data.openid;
       // oauth.getUser(openid,function(err,_result){     
       // }        
      //);
        console.log('set openid');
        res.cookie('openid',openid);
        res.redirect('login/');
        res.end();
    }else{
        console.log('code unvalid');
        res.end();
    }
    

  });
};


//创建菜单
exports.setMenu = function(req, res){
	var menu = {
				 "button":[
				   {
				     "type":"view",
				     "name":"互助停车",
				     "url": config.domain+"/wechat/login/"
				   },
           {
             "type":"view",
             "name":"分享车位",
             "url": config.domain+"/login"
           },
            {
             "name":"联系我们",
             "sub_button":[
               {
                 "type":"click",
                 "name":"快速充值",
                 "key":"recharge"
               },
               {
                 "type":"view",
                 "name":"下载安桌版",
                 "url":config.domain+"/recharge"
               },
               {
                 "type":"view",
                 "name":"关于我们",
                 "url":config.domain+"/connectUs"
               }]
             }
            ]
				   
				};

	 api.createMenu(menu,function(err,result){
       res.json(result);
       res.end();
   });
};


//提现功能
exports.recharge = function(req, res){
        console.log('redirect');
        res.redirect("weixin://contacts/profile/linzehuan_");
};


exports.app = function(req,res) {
       
}