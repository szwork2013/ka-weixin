/*
**定义微信入口模块
*/
var fs = require('fs');
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var config = {
  token: 'weixin',
  appid: 'wxc11926e87fca4c33',
  encodingAESKey: 'fAEBTD5FYRZp0GVuiTH7YBkHVNsXE94yWyA56ayqPxC',
  secret: "3d9fd4a4e62b392166cfe7600ee07d17",
  domain: "http://app.kapark.cn"   //开发环境域名 "http://120.24.84.180"
};

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
  res.reply('图片');
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
    var content = '';
    switch(message.EventKey){
        case 'recharge': content = "点击我的微信：&lt;a href=&quot;weixin://contacts/profile/linzehuan_&quot;&gt;StartOne&lt;/a&gt;";break;
        default: content = 'click类型不存在';
      };
    content =  '充值客服：<a href="http://baidu.com">1. 点击记录团队充值</a>';
    res.reply(content); 
  } else {
    res.reply('暂未支持! Coming soon!');
  }
}));


exports.login = function(){

};

exports.setMenu = function(req, res){
	var menu = {
				 "button":[
				   {
				     "type":"view",
				     "name":"互助停车",
				     "url": config.domain+"/login"
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
                 "url":config.domain+"/"
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
        console.log(err);
        console.log(result.toString());
   });
};