//微信接收信息，自动回复信息功能
var initWechat =  require('./initWechat')
var wechat = initWechat.wechat;
var config = initWechat.config;
var replyConfig = initWechat.replyConfig;
exports.index = wechat(replyConfig, wechat.text(function (message, req, res) {
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

        //接收到图片  
        }).image(function (message, req, res) {
          console.log(message);

        //接收到位置  
        }).location(function (message, req, res) {
          console.log(message);
          res.reply('位置');

        //接收到语音
        }).voice(function (message, req, res) {
          console.log(message);
          res.reply('语音');

        //接收到链接
        }).link(function (message, req, res) {
          console.log(message);
          res.reply('链接');

        //接收到事件  
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