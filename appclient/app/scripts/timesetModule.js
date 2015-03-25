var timesetModule = angular.module('timesetModule', []);
timesetModule.controller('timesetCtrl', ['$scope', 'Request', 'User', '$stateParams', function($scope, Request, User, $stateParams){
	$scope.type = [false, false, false]; //单次，周期，长期
	$scope.week = [false, false, false, false, false, false, false];
	$scope.noTurnOn = true;

	$scope.noTurnOff = true;

	$scope.oneEndTime = {
		day: '1',
		hour: (new Date()).getHours() < 10 ? '0' + (new Date()).getHours() : '' + (new Date()).getHours() ,
		minute: '00'
	}
	$scope.cycleTime = {
		start: {
			hour: '09',
			minute: '00'
		},
		end: {
			hour: '16',
			minute: '00'
		}
	}
	var shareTime;
	Request.post(Request.url.QueryParkDetailSchedule, {
		strUserName: User.username,
		strPassWord: User.password
	}, function(data) {
		var i, len, res = data.result, parkDetailId = $stateParams.parkDetailId, r1, r2 ;
		var start = new Date(),
			end = new Date(),
			now = new Date();
		for(i=0, len = res.length; i < len; i++) {
			if( res[i].fparkdetailid == parkDetailId ) {
				shareTime = res[i];
				break;
			}
		}
		console.log(shareTime);
		$scope.title = shareTime.fname + shareTime.fnumber;

		if(shareTime.ftype == '单次' && shareTime.fremark == '长期' ){
			$scope.type[2] = true;
		} else if( shareTime.ftype == '周期' ) {
			$scope.type[1] = true;
			for( i = 0, len = shareTime.fWeek.length; i < len; i++){
				$scope.week[parseInt(shareTime.fWeek[i]) - 1] = true;
			}
			r1 = /\/Date\(([0-9]+)\)\//.exec(shareTime.fStartDateTime);
			r2 = /\/Date\(([0-9]+)\)\//.exec(shareTime.fEndDateTime);
			start.setTime(r1[1]);
			end.setTime(r2[1]);
			$scope.cycleTime = {
				start: {
					hour: start.getHours() < 10 ? '0' + start.getHours(): start.getHours(),
					minute: start.getMinutes() < 10 ? '0' + start.getMinutes(): start.getMinutes(),
				},
				end: {
					hour: end.getHours() < 10 ? '0' + end.getHours(): end.getHours(),
					minute: end.getMinutes() < 10 ? '0' + end.getMinutes(): end.getMinutes(),
				}
			}


		} else if(shareTime.ftype == '单次' ) {
			$scope.type[0] = true;
			r2 = /\/Date\(([0-9]+)\)\//.exec(shareTime.fEndDateTime);
			end.setTime(r2[1]);
			var day =parseInt( end.getTime()/1000/60/60/24 ) - parseInt( now.getTime()/1000/60/60/24 );

			$scope.oneEndTime = {
				day: day >0? day+ '': '1',
				hour: end.getHours() < 10 ? '0' + end.getHours(): end.getHours(),
				minute: end.getMinutes() < 10 ? '0' + end.getMinutes(): end.getMinutes()
			}
		}

		//辨别启用暂停分享按钮
		if(shareTime.fStatus == '启用'){
			$scope.noTurnOff = false;
		}else {
			$scope.noTurnOn = false;
		}

		/*
		$scope.type = shareTime.ftype;
		$scope.week = shareTime.fWeek;
		$scope.cost = shareTime.fcost;
		$scope.startDataTime = shareTime.fEndDateTime;
		$scope.endDateTime = shareTime.fStartDateTime;
		$scope.remark = shareTime.fremark;
		*/
	});

	function dateToStr(date) {
		var year = date.getFullYear(),
			month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1): (date.getMonth()+1),
			day = date.getDate() < 10 ? '0' + date.getDate(): date.getDate(),
			hour = date.getHours() < 10 ? '0' + date.getHours(): date.getHours(),
			minute = date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes(),
			second =  date.getSeconds() < 10 ? '0' + date.getSeconds():date.getSeconds();
		
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

	}




	$scope.enableMyParkDetailSchedule = function() {
		var i,len, now = new Date();

		var postObj = {
			strUserName: User.username,
			strPassWord: User.password,
			iParkDetailSchedule: shareTime.fid,
			iParkDetailID:shareTime.fparkdetailid,
			strCost: shareTime.fcost
		};
		if($scope.type[0]) { //单次
			postObj.strType = '单次';
			postObj.strRemark = '';
			postObj.strWeek = '0';
			postObj.strStartDateTime = dateToStr(now);

			now.setDate(now.getDate() + parseInt($scope.oneEndTime.day));
			now.setHours(parseInt($scope.oneEndTime.hour, 10));
			now.setMinutes(parseInt($scope.oneEndTime.minute, 10));
			postObj.strEndDateTime = dateToStr(now);

		} else if( $scope.type[1]) { //周期
			postObj.strType = '周期';
			postObj.strRemark = '';
			postObj.strWeek = '';
			for(i=0 ; i<7; i++) {
				if($scope.week[i]) {
					postObj.strWeek += (i+1);
				}
			}
			postObj.strStartDateTime = $scope.cycleTime.start.hour + ':' + $scope.cycleTime.start.minute + ':00';
			postObj.strEndDateTime = $scope.cycleTime.end.hour + ':' + $scope.cycleTime.end.minute + ':00';


		} else if($scope.type[2]) { //长期
			postObj.strType = '单次';
			postObj.strRemark = '长期';
			postObj.strWeek = '0';
			postObj.strStartDateTime = dateToStr(now);
			now.setFullYear(now.getFullYear() + 1);
			postObj.strEndDateTime = dateToStr(now);
		}

		console.log(postObj);
		Request.post(Request.url.SetMyParkShareTime, postObj, function(data) {
			console.log(data);
			if(data.result > 0 ) {
				alert('启用分享成功');
				$scope.noTurnOn = true;
			} else {
				alert('启用分享失败，错误码：' + data.result );
			}
		})


	}
	
	$scope.disableMyParkDetailSchedule = function() {
		Request.post(Request.url.DisableMyParkDetailSchedule, {
			strUserName: User.username,
			strPassWord: User.password,
			iParkScheduleID: shareTime.fid
		}, function(data) {
			console.log(data);
			alert('暂停分享成功');
			$scope.noTurnOff = true;
		});
	}



	$scope.weekClick = function(index) {
		$scope.week[index] = !$scope.week[index];
		$scope.noTurnOn = false;
	}

	$scope.typeClick = function(index) {
		if($scope.type[index] === true) {
			$scope.type[index] = false;
			$scope.noTurnOn = true;
		} else {
			$scope.type[0] = $scope.type[1] = $scope.type[2] = false;
			$scope.type[index] = true;

			$scope.noTurnOn = false;
		}
		
	}

	$scope.modal = [false, false]; //0 为单次分享时间设置 1为重复
	$scope.popModal = function(index) {
		$scope.modal[index] = true;
		$scope.noTurnOn = false;
	}
	$scope.hideModal =  function(index) {
		$scope.modal[index] = false;
		$scope.noTurnOn = false;
	}


	

	
	
}]);