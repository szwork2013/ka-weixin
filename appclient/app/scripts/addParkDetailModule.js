var addParkDetailModule = angular.module('addParkDetailModule', []);

addParkDetailModule.controller('addParkDetailCtrl', ['$scope', 'Request', 'User', '$location', function($scope, Request, User, $location) {
	$scope.iParkID = 111; //先设置月岛
	$scope.strParkNumber = '';
	$scope.registerParkDetail = function(){
		Request.post(Request.url.RegisterParkDetail, {
			strUserName: User.username,
			strPassword: User.password,
			iParkID: $scope.iParkID,
			strParkNumber: $scope.strParkNumber
		}, function(data) {
			if(data.result == '车位认领成功') {
				alert('添加车位成功，请等待审核');
				$location.path('/parkManege');
			} else {
				alert('添加车位失败');
			}
			
			
		});
	}
}]);