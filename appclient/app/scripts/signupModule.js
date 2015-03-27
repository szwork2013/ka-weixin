var signupModule = angular.module('signupModule', []);
signupModule.controller('signupCtrl', ['$scope', 'User', 'Request', '$location', 'ipCookie', function($scope, User, Request, $location, ipCookie){
	//设置好WXid
	User.setWxUserInfo(ipCookie('openid'), ipCookie('headimgurl'));
	alert(ipCookie('openid'));
	alert(document.cookie);

	$scope.username = '';
	$scope.vcode = '';

	$scope.banBinging = true;
	$scope.banVcode = true;


	var getVcodeTime = 0;
	$scope.getVCode = function() {
		Request.post(Request.url.GetRegisterVCode, {
		  	strUserName: $scope.username
		}, function(data){
			console.log(data);
			getVcodeTime += 1;
			$scope.banVcode = true;
			
			var fn = (function(){
				var second =120,
					btn = angular.element(document.querySelector('.code-btn')),
					Scope = $scope;
				return function(){
					second--;
					btn.html(second + '秒后重获');
					if(second > 0) {
						setTimeout(arguments.callee, 1000);
					} else {
						$scope.$apply(function(){
							$scope.banVcode = false;
							console.log($scope.banVcode);
							btn.html('获取验证码');
						});
					}
				}
			})();
			setTimeout(fn, 1000);
		});
	}

	$scope.WXBinding = function() {
		
		Request.post(Request.url.WXBinding, {
		  	strUserName: $scope.username +'',
		  	strVCode: $scope.vcode,
		  	strWXID: User.wxId
		}, function(data){
			console.log(data);
			alert(data.result);
			if(data.result2){
				Request.post(Request.url.GetUserNameByWXID, {
					strWXID: User.wxId
				}, function(data){
					ipCookie('strUserName', $scope.username+'');
					ipCookie('strPushID', data.result2);
					//设置好WXid
					User.setWxUserInfo(ipCookie('openid'), ipCookie('headimgurl'));
					//设置好用户名
					User.setUserName(ipCookie('strUserName'), ipCookie('strPushID'));
					
					$location.path('/index');
				});
			} else {
				alert('请重新输入');
			}
		});
	}
	
	$scope.testPhone = function(){
		if(/^[0-9]{11}$/.test($scope.username) && getVcodeTime == 0) {
			$scope.banVcode = false;
			
		} else{
			$scope.banVcode = true;
		}
	}
	
	$scope.testBind = function() {
		if(/^[0-9]{11}$/.test($scope.username) && /^[0-9]{4}$/.test($scope.vcode) ) {
			$scope.banBinging = false;
		}else {
			$scope.banBinging = true;
		}
	}
	


}]);