// 推广二维码管理
var initWechat =  require('./initWechat');
var api = initWechat.api;
var config = initWechat.config;
var https = require("https");
var fs = require('fs');
var path = require('path');
var saler = require('../Models/salerModel');
var QRCODE_DIR = path.join(__dirname,'..','..','config','qrcode');
function saveQRCode (url,name){
		https.get(url, function(res){
		    var imgData = "";
		    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
		    res.on("data", function(chunk){
		        imgData+=chunk;
		    });

		    res.on("end", function(){
		        fs.writeFile(QRCODE_DIR+"/"+name+".jpg", imgData, "binary", function(err){
		            if(err){
		                console.log(err+"down fail");
		            }else{
		                console.log("down success");
		            }
		            
		        });
		    });
	});
}

exports.addSaler = function (req, res) {
		var salerID = '1'; //对应的ID
		var fid = '1';
		// api.createLimitQRCode(fid,function(err,result){
		// 	if(err)console.log(err);
		// 	else{
		// 		var qrcode = api.showQRCodeURL(result.ticket);
		// 		saveQRCode(qrcode,fid);
		// 		res.json(qrcode);
		// 	}
		// });
		
		saler.addSaler({strUserName:'林泽化',strPhone:'15627868920',strPassword:'123345'},function(result){
			console.log(result.insertId);
		})

};








 

