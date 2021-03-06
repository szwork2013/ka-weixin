var indexModule = angular.module('indexModule', []);

indexModule.controller('initIndexCtrl', ['$scope', 'Wxsdk', '$location', 
	'ipCookie', 'User', 'Request', 'permissions', function($scope, Wxsdk, $location,ipCookie, User, Request, permissions) {
	alert(document.cookie);


	$scope.$on('initPage', function(event) {
			
		var $imgsWrap = $('.imgs-wrap'),
			$slider = $('.slider');

		//动态设置高度
		window.onload = function(){
			$slider.css('height', $imgsWrap.height());
		}
		
		var slide = (function (){
			var index = 0,
				length = 3,
				width = $(window).width();
			return function(){
				if(++index >= length){
					index = 0;
				}
				var strTransform = 'matrix(1, 0, 0, 1, '+ (-width*index) +', 0)';
				//console.log(strTransform);
				$imgsWrap.css('transform', strTransform);
			}
		})();

		setInterval(slide, 3000);

		var $shutdown = $('.shutdown');
		$shutdown.one('click', function(){
			$shutdown.parent().hide();
		});

		//设置整体高度
		var $kapark = $('#kapark');
		$kapark.css('height', $(window).height());

		//设置顶端行高
		var $header = $('header');
		$header.css('line-height', $header.height()+'px');

	});

	$scope.hasCar = false;
	$scope.username = User.username;
	Request.post(Request.url.QueryMyParkinging, {
		strUserName: User.username,
		strPassWord: User.password
	}, function(data){
		console.log(data);
		if(data.result.length>0) {
			$scope.hasCar= true;
			$scope.carnumber = data.result[0].fcarnumber;
			$scope.parkName =  data.result[0].fName;
			$scope.carStatus = data.result[0].fStatus;
			$scope.parkNumber =  data.result[0].fNumber;
			$scope.endTime = data.result[0].fParkingEndDateTime;
		}
	})




}]);

indexModule.directive("init", function(){
	return  {
		restrict: "A",
		link: function(scope, element, attrs) {
			scope.$emit('initPage');
		}
	}
});


//
var queryParkModule = angular.module('queryParkModule', []);
queryParkModule.controller('parkListCtrl',['$scope', 'User', 'Request', 'LoctionSdk',function($scope, User, Request, LoctionSdk) {

	var wx_obj = wx;
	var obj = {
		strUserName: User.username,
		strPassWord: User.password,
		Longtitude: User.longtitude,
		Latitude: User.latitude,
		Distant: 5
	}
	
	Request.post(Request.url.GetFreeParkListByDistance, obj, function(data){
		console.log(data.result);
					var parks = [], park, i, len;
					var res = data.result;
					for(i=0, len=res.length; i < len; i++){
						park = {
							id: res[i].fid,
							name: res[i].fName,
							leave: res[i].fFreeParkNumber,
							address: res[i].fAddress,
							location: LoctionSdk.DistanceFromMe(res[i].fLatitude, res[i].fLongtitude)
						};
						parks.push(park);
					}
					console.log(parks);
					$scope.parks = parks;
	});

}]);


var histroyModule = angular.module('histroyModule', []);
histroyModule.controller('historyCtrl', ['$scope', 'User', 'Request', function($scope, User, Request) {
	var changeDate = function(originDate){
		var reg = /\/Date\(([0-9]+)\)\//;
		var m = reg.exec(originDate);
		var date = new Date();
		date.setTime(m[1]);
		var strDate = (date.getMonth()+1) +'/'+ date.getUTCDate()+ 
					' '+ date.getUTCHours()  + ':' + date.getUTCMinutes();
		return strDate;
	}


	Request.post(Request.url.QueryMyAllParkingEx, {
		strUserName:  User.username,
		strPassWord:  User.password,
		iPage : 1
	}, function(data) {

		console.log(data.result);
		var histroys = []; var histroy = {}, isIn;
		for(var i = 0, len = data.result.length; i < len; i++) {
		 	if(data.result[i].fPayment != null) {
		 		histroy = {};
		 		histroy.name = data.result[i].fName;
		 		histroy.number = data.result[i].fNumber;
		 		histroy.inTime = data.result[i].fStartDateTime;
		 		histroy.endTime = data.result[i].fEndDateTime;
		 		histroy.payment = parseInt(data.result[i].fPayment*4)/10;
		 		if(data.result[i].fPayment < 0 ){
		 			histroy.carnumber = data.result[i].fcarnumber;
		 		}
		 		histroy.state = data.result[i].fPayment < 0 ? '缴费':'进账';
		 		histroy.score = data.result[i].fScore || 0;
		 		histroys.push(histroy);
		 	}
		}
		$scope.histroys = histroys;

	});
}]);