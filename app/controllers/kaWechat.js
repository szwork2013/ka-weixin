/*
**定义微信入口模块
*/
var config = {
  token: 'weixin',
  appid: 'wxc11926e87fca4c33',
  encodingAESKey: 'fAEBTD5FYRZp0GVuiTH7YBkHVNsXE94yWyA56ayqPxC',
  secret: "3d9fd4a4e62b392166cfe7600ee07d17",
  domain: "http://120.24.84.180"
};
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var getAppsInfo = require('../../config/apps-info'); // 从外部加载app的配置信息
var appInfo = getAppsInfo();
// var api = new WechatAPI(appInfo.appid, appInfo.secret, function (callback) {
//   // 传入一个获取全局token的方法
//   fs.readFile('access_token.txt', 'utf8', function (err, txt) {
//     if (err) {return callback(err);}
//     callback(null, JSON.parse(txt));
//   });
// }, function (token, callback) {
//   // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//   fs.writeFile('access_token.txt', JSON.stringify(token), callback);
// });
var i =0;
console.log(i++);


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
  } else {
    res.reply('暂未支持! Coming soon!');
  }
}));


exports.login = function(){

};