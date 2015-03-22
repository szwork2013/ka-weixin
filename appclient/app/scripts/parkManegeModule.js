var parkManegeModule = angular.module('parkManegeModule', []);
parkManegeModule.controller('GetMyParkDetail', ['$scope', 'User', 'Request',function($scope, User, Request){

	Request.post(Request.url.QueryParkDetailSchedule, {
		strUserName: User.username,
		strPassWord: User.password
	}, function(data) {
		console.log(data);

		var res = data.result, i, len;
		var details = [], detail;
		var examines = [];

		for( i=0, len = res.length; i < len; i++ ) {
			if(res[i].fDetailtype === '待审核') {
				examines.push(res[i]);
			} else {
				detail = res[i];
				if(detail.fStatus === '停用') {
					detail.showNoShare = true;
					detail.showCycle3 = false;
					detail.showCycle1 = false;
					detail.showCycle2 = false;
					detail.showTime = false; 
					details.push(detail);
					continue;
				}
				
				detail.showNoShare = false;

				detail.showCycle3  = detail.fremark == '长期'? true:false;

				if(detail.showCycle3 || /\/Date\((-[0-9]+)\)\//.test(detail.fStartDateTime) ) {
					detail.showTime = false; 
				} else {
					detail.showTime = true;
				}

				if(detail.showTime && detail.ftype == '单次') {
					detail.showCycle1 = true;
					detail.showCycle2 = false;
				} else if(detail.showTime){
					detail.showCycle1 = false;
					detail.showCycle2 = true;
				} else {
					detail.showCycle1 = false;
					detail.showCycle2 = false;
				}

				details.push(detail);
			}
		}

		console.log(details);
		console.log(examines);

		$scope.details = details;
		$scope.examines = examines;

	})



			
}]);