/*
**定义微信入口模块
*/
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var getAppsInfo = require('../../config/apps-info'); // 从外部加载app的配置信息
var appInfo = getAppsInfo();
var api = new WechatAPI(appInfo.appid, appInfo.secret, function (callback) {
  // 传入一个获取全局token的方法
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

var config = {
  token: 'token',
  appid: 'appid',
  encodingAESKey: 'encodinAESKey'
};

// exports.index = function(){
// 	 wechat.checkSignature();
// }


exports.index = wechat("weixin", wechat.text(function (message, req, res) {
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
  res.reply('还没想好图片怎么处理啦。');
}).location(function (message, req, res) {
  console.log(message);
  res.reply('想和我约会吗，不要的啦。');
}).voice(function (message, req, res) {
  console.log(message);
  res.reply('心情不好，不想搭理你。');
}).link(function (message, req, res) {
  console.log(message);
  res.reply('点连接进来的是吧！');
}).event(function (message, req, res) {
  console.log(message);
  if (message.Event === 'subscribe') {
    // 用户添加时候的消息
    res.reply('谢谢添加Node.js公共帐号:)\n回复Node.js API相关关键词，将会得到相关描述。如：module, setTimeout等');
  } else if (message.Event === 'unsubscribe') {
    res.reply('Bye!');
  } else {
    res.reply('暂未支持! Coming soon!');
  }
}));