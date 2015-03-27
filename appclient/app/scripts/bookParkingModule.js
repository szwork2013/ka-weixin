var bookParkingModule = angular.module('bookParkingModule', []);

bookParkingModule.controller('bookParkingCtrl', ['$scope', 'User', 'Request', '$stateParams', '$location', function($scope, User, Request, $stateParams,  $location){

	$scope.CarNumbers = []; //供选择的车牌号
	$scope.iCarID = ''; //车牌ID
	$scope.addCarNumber = ['粤', 'A', '']; //车牌
	$scope.iParkID = 111; //停车场ID 暂时默认月岛
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
	//选择车牌
	$scope.changeiCarID = function(index){
		$scope.iCarID = index;
	}

	$scope.modal = false;
	$scope.showModal = function() {
		$scope.modal = true;
	}
	$scope.hideModal = function() {
		$scope.modal = false;
	}
	//添加车牌
	$scope.addCark = function(){
		if($scope.addCarNumber[2] === ''){
			alert('车牌不能为空！请重新输入');
			return 1;
		}
		Request.post(Request.url.AddCar, {
			strUserName: User.username,
			strPassWord: User.password,
			strCarNumber: $scope.addCarNumber[0]+$scope.addCarNumber[1]+' '+$scope.addCarNumber[2],
			strCarLabel: '微信端添加车牌'
		}, function(data) {
			console.log(data);
			if(data.result > 0) {
				$scope.hideModal();
				$scope.iCarID =  data.result;
				$scope.CarNumbers.push({
					number: $scope.addCarNumber[0]+$scope.addCarNumber[1]+' '+$scope.addCarNumber[2],
					id: data.result
				});
				$scope.addCarNumber[2] = '';
			} else {
				switch(data.result) {
					case -99: alert('用户名或密码不对'); break;
					case -1: alert('数据库插入错误'); break;
					case -2: alert('车牌重复'); break;
					case -3: alert('异常'); break;
					case -4: alert('车牌重复'); break;
					default: alert('添加失败，错误码：' + data.result);
				}
				
			}
		});
	}




	//详细信息获取
	$scope.username = User.username;
	$scope.endtime = '';
	$scope.number = '';
	$scope.parkName = '';
	Request.post(Request.url.GetFreeParkDetailList, {
		strUserName: User.username,
		strPassWord: User.password,
		iParkID: $scope.iParkID
	}, function(data) {
		var res = data.result;
		console.log(res);
		for(var i=0, len=res.length; i < len; i++){

			if(res[i].fID == $stateParams.iParkDetailID) {
				$scope.parkName = res[i].fname;
				$scope.number = res[i].fNumber;
				$scope.endtime = res[i].fShowParkingEndDateTime.substr(0,1) === '多' ? res[i].fShowParkingEndDateTime : res[i].fParkingEndDateTime;
				break;
			}
		}
	});


	$scope.bookingPark = function(){
		Request.post(Request.url.BookParking, {
			strUserName: User.username,
			strPassWord: User.password,
			iParkID: $scope.iParkID,
			iParkDetailID: $stateParams.iParkDetailID,
			iCarID: $scope.iCarID
		}, function(data) {
			if(data.result > 0) {
				alert('预约成功!');
				$location.path('/index');
			} else {
				switch(data.result) {
					case -1: alert('系统异常'); break;
					case -2: alert('数据增加异常问题'); break;
					case -3: alert('本车位还有未结算等记录'); break;
					case -4: alert('帐号余额不足,请及时充值'); break;
					case -5: alert('更新帐号余额失败'); break;
					case -6: alert('汽车车牌已经被使用'); break;
					case -7: alert('你已经租用了一个车位，一次只能租用一个车位'); break;
					default: alert('预约失败,错误码为:' + data.result);
				}
			}
		})
	}


}]);