var services = angular.module('services', []);


//请求发送服务
services.factory('Request', ['$http', function($http) {
		//var host = 'http://120.24.84.180:3000';//开发
		var host = 'http://120.24.166.18:3000';//正式
		var url = {
			GetFreeParkListByDistance: host + '/park/GetFreeParkListByDistance',
			GetFreeParkDetailList: host + '/park/GetFreeParkDetailList',
			GetParkDetail: host + '/park/GetParkDetail',
			QueryMyAllParkingEx: host + '/user/QueryMyAllParkingEx',
			GetMyBalance: host + '/user/GetMyBalance',
			QueryBalanceList: host + '/user/QueryBalanceList',
			GetMyParkDetail: host + '/park/GetMyParkDetail',
			GetMyParkShareTime: host + '/park/GetMyParkShareTime',
			QueryParkDetailSchedule: host + '/park/QueryParkDetailSchedule',
			GetRegisterVCode: host + '/user/GetRegisterVCode',
			WXBinding: host + '/user/WXBinding',
			UpdateMyParkShareTime: host + '/park/UpdateMyParkShareTime',
			DisableMyParkDetailSchedule: host + '/park/DisableMyParkDetailSchedule',
			SetMyParkShareTime: host + '/park/SetMyParkShareTime',
			GetUserNameByWXID: host + '/user/GetUserNameByWXID',
			RegisterParkDetail: host + '/park/RegisterParkDetail',
			GetUserNameByWXID: host + '/user/GetUserNameByWXID',
			BookParking: host + '/park/BookParking',
			AddCar: host + '/car/AddCar',
			GetMyCarList: host + '/car/GetMyCarList',
			QueryMyParkinging: host + '/car/QueryMyParkinging'
		};

		var post, get;
		post = function(url, obj, callback){
				$http.post(url,obj,{	   			
			   			headers: {
				      		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		   					},
						transformRequest: function(obj) {
						        var str = [];
						        for(var p in obj)
						        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						        return str.join("&");
						   }
		   				
			  	   }).success(function(data, status, headers, config){			   			
			   			 if(callback){callback(data);}
				   }).error(function(data, status, headers, config){
			   			 console.log('错误'+data);
			  	   }) ;
			};

		get = function(url, obj, callback){
				$http.get(url,obj,{	   			
			   			headers: {
				      		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		   					},
						transformRequest: function(obj) {
						        var str = [];
						        for(var p in obj)
						        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						        return str.join("&");
						   }
		   				
			  	   }).success(function(data, status, headers, config){
			   			 if(callback){callback(data);}
				   }).error(function(data, status, headers, config){
			   			 console.log('错误'+data);
			  	   }) ;
			};

		return {
			url: url,
			post: post,
			get: get
		}

}]);

//用户信息服务
services.factory('User', function() {
    var longtitude = 113.314515,
		latitude = 23.113742,
		username = '',
		password = '',
		wxId = '',
		headimgurl = '';

	var setLocation = function  (latitude,longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	var setWxUserInfo = function(wxId, headimgurl){
		this.wxId = wxId;
		this.headimgurl = headimgurl;
		console.log(this.wxId);
	};

	var setUserName = function(username, pushId) {
		if(!username) return ;
		this.username = username;
		this.password = hex_md5(username + '2015' + pushId);
	}

	return {
		longtitude: longtitude,
		latitude: latitude,
		username: username,
		password: password,
		wxId: wxId,
		headimgurl: headimgurl,
		setLocation: setLocation,
		setWxUserInfo: setWxUserInfo,
		setUserName: setUserName
	}
});

//微信接口服务

services.factory('Wxsdk', ['$http',  'Request', 'User', 'ipCookie', function($http, Request, User, ipCookie) {
	var local_wx = wx;
	var wx_config = {
					debug: false,
					appId: '',
					timestamp: '',
					nonceStr: '',
					signature: '',
					jsApiList: [
						'checkJsApi',
						'openLocation',
						'getLocation',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
		                'onMenuShareWeibo'
					]
	};
	//初始化WX接口设置
	wx_config.appId = ipCookie('appId');
   	wx_config.timestamp = ipCookie('timestamp');
   	wx_config.nonceStr = ipCookie('nonceStr');
   	wx_config.signature = ipCookie('signature');
	wx.config(wx_config);

	var state = '正在调用';
	
	wx.ready(function(){
		wx.getLocation({
	    	success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
				User.setLocation(latitude,longitude);
				state = '调用地理成功';
				console.log(res);
					if(callback){callback();}
	    	},
		    error:function(){
					if(callback){callback();}
		   		}
		});
	});
	wx.error(function (res) {
 		alert("配置信息失败"+res.errMsg);
	});

	

	//设置好WXid
	User.setWxUserInfo(ipCookie('openid'), ipCookie('headimgurl'));

	//设置好用户名
	User.setUserName(ipCookie('strUserName'), ipCookie('strPushID'));

     
	

	return {
		state: state
	}


}]);

//地理位置计算 暂无使用
services.factory('LoctionSdk',['User', function(User){

	var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    function getRad(d){
        return d*PI/180.0;
    }

    var myLatitude = User.longtitude,
    	mylongitude = User.longitude;
	return {
		DistanceFromMe: function(latitude, longitude) {
	        var a = getRad(myLatitude) - getRad(latitude);
	        var b = getRad(mylongitude) - getRad(longitude);
	        
	        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(getRad(myLatitude))*Math.cos(getRad(latitude))*Math.pow(Math.sin(b/2),2)));
	        s = s*EARTH_RADIUS;
	        s = Math.round(s*10000)/10000.0;
	                
	        return s;
		}
	}

}]);

//权限映射服务 暂未使用
services.factory('permissions', function ($rootScope) {
	var permissionList;
	return {
		setPermissions: function(permissions) {
	        permissionList = permissions;
	        $rootScope.$broadcast('permissionsChanged')
	    },
	    hasPermission: function (permission) {
	        permission = permission.trim();
	        return _.some(permissionList, function(item) {
	          if(_.isString(item.Name))
	            return item.Name.trim() === permission
	        });
	    }
	};
})