
//正式版配置
var wechat =  {
    token: 'weixin',
    appid: 'wxc11926e87fca4c33',
    encodingAESKey: 'fAEBTD5FYRZp0GVuiTH7YBkHVNsXE94yWyA56ayqPxC',
    secret: '3d9fd4a4e62b392166cfe7600ee07d17',
    domain: 'http://wechat.kapark.cn',
    redirect_url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc11926e87fca4c33&redirect_uri=http%3A%2F%2Fwechat.kapark.cn%2Fwechat%2Fcallback&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect',  
          //开发环境域名 'http://120.24.84.180'
};

var db = {
	db_host: '127.0.0.1',
	db_port: '3300',
	db_name: 'carParking',
	db_user: 'kapark',
	db_passwd: 'carparking%!#',
	db_charset: 'UTF8',
	db_conn_limit: 5,
	debug: false
};
var replyConfig = wechat;

//测试版配置
var wechat_dev =  {
    token: 'weixin',
    appid: 'wxe33b6f576ff09aa0',
    secret: '9a113308b7f63d23fbc03ad5d206fa2b',
    domain: 'http://app.kapark.cn', 
    redirect_url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe33b6f576ff09aa0&redirect_uri=http%3A%2F%2Fapp.kapark.cn%2Fwechat%2Fcallback&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect',  
     //开发环境域名 'http://120.24.84.180'
};
var db_dev = {
	db_host: '120.24.84.180',
	db_port: '3300',
	db_name: 'carParking',
	db_user: 'cars',
	db_passwd: 'carparking2014',
	db_charset: 'UTF8',
	db_conn_limit: 5,
	debug: true
};

var replyConfig_dev = wechat_dev.token;


//正式
exports.wechat = wechat;
exports.db = db;
exports.replyConfig = replyConfig;
//测试
// exports.wechat = wechat_dev;
// exports.db = db_dev;
// exports.replyConfig = replyConfig_dev;
//转服务器时，需要清除config目录下的access_token.txt里的token和expiretime,清除ticket_token.txt 里的值


