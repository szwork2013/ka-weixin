/*
 * 定义调用C#后台的接口列表
 */
var urllib = require('urllib');
var HOST = 'http://120.24.84.180:3000';
var URL = {
	GETUSERBYWXID: HOST+'/User/GetUserNameByWXID'
};

var ka_api = {

};

var postJSON = function(data) {
	return {
		dataType: 'json',
		type: 'POST',
		data: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

};

ka_api.getUserByWxID = function(obj, callback) {
	console.log(obj.strWXID);
	urllib.request(URL.GETUSERBYWXID, postJSON(obj), callback);
};

module.exports = ka_api;