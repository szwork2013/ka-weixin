var signupModule = angular.module('signupModule', []);
signupModule.controller('signupCtrl', ['$scope', 'User', 'Request', '$location', function($scope, User, Request, $location){
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
		});
	}

	$scope.WXBinding = function() {
		console.log({
		  	strUserName: $scope.username,
		  	strVCode: $scope.vcode,
		  	strWXID: User.wxId
		});
		Request.post(Request.url.WXBinding, {
		  	strUserName: $scope.username +'',
		  	strVCode: $scope.vcode,
		  	strWXID: User.wxId
		}, function(data){
			console.log(data);
			alert(data.result);
			if(data.result2 == 'true' ){
				$location.path('/index');
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