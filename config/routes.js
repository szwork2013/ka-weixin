
var wechat = require('../app/controllers/wechatController');
module.exports = function  (app) {
    //微信开发绑定的url,需要支持get和post,所以使用use
    app.use('/wechat/index',wechat.index);
    app.get('/wechat/login/',wechat.login);
    app.get('/wechat/setmenu',wechat.setMenu);
    app.get('/wechat/oauth',wechat.oauth);
    app.get('/wechat/callback',wechat.callback);
    app.get('/wechat/addSaler',wechat.addSaler); 
};