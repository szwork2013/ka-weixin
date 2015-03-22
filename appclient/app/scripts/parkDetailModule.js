var parkDetailModule = angular.module('parkDetailModule', []);

parkDetailModule.controller('parkDetailCtrl', ['$scope', 'User', 'Request', '$stateParams',function($scope, User, Request, $stateParams){
	var $shade = $('.shade');
	$shade.on('click', function(){
		$shade.removeClass('pop');
	});

	$scope.onModalPop = function(){
		$shade.addClass('pop');
	}

	var $refuse = $('.refuse');
	$refuse.on('click', function(e){
		$shade.removeClass('pop');
		e.stopPropagation();
	});

	var $modal = $('.modal');
	$modal.on('click', function(e){
		e.stopPropagation();
	});

	//获取空闲车位信息
	
	Request.post(Request.url.GetFreeParkDetailList, {
		strUserName: User.username,
		strPassWord: User.password,
		iParkID: $stateParams.parkId
	}, function(data) {
		console.log(data);
		var parkDetails = [], parkDetail, i, len;
		var res = data.result;
		for(i=0, len=res.length; i < len; i++){
			parkDetail = {
				number: res[i].fNumber,
				time: res[i].fShowParkingEndDateTime,
			};
			parkDetails.push(parkDetail);
		}

		$scope.parkDetails = parkDetails;
	} )
	
	//获取停车场基本信息
	
	Request.post(Request.url.GetParkDetail, {
		strUserName: User.username,
		strPassWord: User.password,
		iParkID: $stateParams.parkId
	}, function(data) {
		var parkInfo = {
						name: data.result.fName,
						address: data.result.fAddress,
						leave: data.result.fFreeParkNumber
					};
		console.log(parkInfo);
		$scope.parkInfo = parkInfo;
	})

	   	
	 

}]);

