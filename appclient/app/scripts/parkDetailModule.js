var parkDetailModule = angular.module('parkDetailModule', []);

parkDetailModule.controller('parkDetailCtrl', ['$scope', 'User', 'Request', '$stateParams',function($scope, User, Request, $stateParams){
	var $shade = $('.shade');
	$shade.on('click', function(){
		$shade.removeClass('pop');
	});

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
				minCost: res[i].fMinCost,
				id: res[i].fID
			};
			parkDetails.push(parkDetail);
		}
		$scope.parkDetails = parkDetails;
	});
	
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
	});

	$scope.CarNumbers = []; 
	$scope.iCarID = '';
	Request.post(Request.url.GetMyCarList, {
		strUserName: User.username,
		strPassWord: User.password
		}, function(data) {
			console.log(data);
			var res = data.result, i, len, CarNumber = {};
			$scope.iCarID = res[0].fid;
			for(i=0, len=res.length; i < len; i++) {
				CarNumber = {
					number: res[i].fCarNumber,
					id: res[i].fid
				}
				$scope.CarNumbers.push(CarNumber);
			}
	});


	$scope.addCarNumber = ['粤', 'A', ''];
	$scope.addCark = function(){
		if($scope.addCarNumber[2] === ''){
			alert('车牌不能为空！请重新输入');
			return 1;
		}
		Request.post(Request.url.AddCar, {
			strUserName: User.username,
			strPassWord: User.password,
			strCarNumber: $scope.addCarNumber[0]+$scope.addCarNumber[1]+' '+$scope.addCarNumber[2],
			strCarLabel: ''
		}, function(data) {
			console.log(data);
			if(data.result > 0) {
				$scope.iCarID =  data.result;
				$scope.CarNumbers.push({
					number: $scope.addCarNumber[0]+$scope.addCarNumber[1]+' '+$scope.addCarNumber[2],
					id: data.result
				});
			} else {
				alert('添加失败，错误码：' + data.result);
			}
		});
	}



	//信息
	$scope.iParkDetailID = '';
	$scope.username = User.username;
	$scope.endtime = '';
	$scope.number = '';


	$scope.onModalPop = function (iParkDetailID, endtime, number) {
		$shade.addClass('pop');
		$scope.iParkDetailID = iParkDetailID;
		$scope.endtime = endtime;
		$scope.number = number;
		console.log($scope.iParkDetailID);
	}

	$scope.changeiCarID = function(index){
		$scope.iCarID = index;
	}


	$scope.bookingPark = function(){
		Request.post(Request.url.BookParking, {
			strUserName: User.username,
			strPassWord: User.password,
			iParkID: $stateParams.parkId,
			iParkDetailID: $scope.iParkDetailID,
			iCarID: $scope.iCarID
		}, function(data) {
			console.log(data);
			if(data.result > 0) {
				alert('预约成功!');
				$shade.removeClass('pop');
			} else {
				alert('预约失败,错误码为:'+data.result);
			}
		})
	}


	 
}]);



