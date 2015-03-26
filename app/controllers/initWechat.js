/*
**定义微信入口模块
*/
var fs = require('fs');
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var config = require("../../config/configs").wechat;
var replyConfig = require("../../config/configs").replyConfig;

var oauth = new wechat.OAuth(config.appid, config.secret,function (openid, callback) {
             fs.readFile('./config/user_access_token/' + openid +'.txt', 'utf8', function (err, txt) {
                    if (err) {return callback(err);}
                    callback(null, JSON.parse(txt));
              });
              }, function (openid, token, callback) {
             fs.writeFile('./config/user_access_token/' + openid + '.txt', JSON.stringify(token), callback);
});

var api = new WechatAPI(config.appid, config.secret, function (callback) {
            fs.readFile('./config/access_token.txt', 'utf8', function (err, txt) {
              if (err) {return callback(err);}
              callback(null, JSON.parse(txt));
            });
            }, function (token, callback) {
            fs.writeFile('./config/access_token.txt', JSON.stringify(token), callback);
});

api.registerTicketHandle(function (type,callback) {
            fs.readFile('./config/ticket_token.txt', 'utf8', function (err, txt) {
              if (err) {return callback(err);}
              callback(null, JSON.parse(txt));
            });
            }, function (type, ticketToken, callback) {
            fs.writeFile('./config/ticket_token.txt', JSON.stringify(ticketToken), callback);
});

module.exports = {
      config: config,
      oauth: oauth,
      api: api,
      wechat: wechat,
      replyConfig: replyConfig
};

