// 创建自定义菜单
var initWechat =  require('./initWechat')
var api = initWechat.api;
var config = initWechat.config;

exports.setMenu = function(req, res){
	var menu = {
				 "button":[
				   {
				     "type":"view",
				     "name":"立即停车",
				     "url": config.domain+"/wechat/login/"
				   },
		           {
		             "type":"click",
		             "name":"快速充值",
		             "key":"recharge"
		           },
		            {
		             "name":"联系我们",
		             "sub_button":[     
		               {
		                 "type":"view",
		                 "name":"下载安卓版",
		                 "url":config.domain+"/recharge"
		               },
		               {
		                 "type":"view",
		                 "name":"使用说明",
		                 "url": config.domain+":3000/source/howtouse"
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