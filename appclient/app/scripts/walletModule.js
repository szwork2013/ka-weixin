var walletModule = angular.module('walletModule', []);
walletModule.controller('getMyBalanceCtrl', ['$scope', 'User', 'Request', function($scope, User, Request){

	Request.post(Request.url.GetMyBalance, {
		strUserName: User.username,
		strPassWord: User.password
	}, function(data) {
		 $scope.money = data.result;
	});

}]);

walletModule.controller('queryBalanceListCtrl', ['$scope', 'User', 'Request', function($scope, User, Request){

	$scope.headimgurl =  User.headimgurl;
	function Owndate(datefromdb) {
		var reg = /\/Date\(([0-9]+)\)\//;
		var m = reg.exec(datefromdb);
		var date = new Date();
		date.setTime(m[1]);
		this.date = date;
	}

	Owndate.prototype.returnDay= function(){
		var str = (this.date.getMonth()+1) + '-' +this.date.getDate();
		return str;
	}
	Owndate.prototype.returnTime = function(){
		var str = '';
		str += (this.date.getMonth()+1)+'-' + this.date.getDate() + ' ';
		str += this.date.getHours()< 13 ? '上午': '下午';
		str += ' ' + this.date.getHours()  + ':' + this.date.getMinutes();
		return str;
	}
	Owndate.prototype.returnDate = function(){
		return this.date;
	}

	Owndate.prototype.cmpDate = function( anoDate ) {
		if(this.date.getMonth() === anoDate.getMonth() 
			&& this.date.getDate() === anoDate.getDate() ) {
			return true;
		}
		return false;
	}
	Request.post(Request.url.QueryBalanceList, {
		strUserName: User.username,
		strPassWord: User.password
	}, function(data) {
		var otherBalances = [], todayBalances = [], yesterdayBalances = [],
			balance, i, len,
			otherShow = false, todayShow = false, yesterdayShow = false,
			profit = 0;

		var res = data.result;
		var today = new Date(),
			yesterday = new Date();

		yesterday.setDate(today.getDate() - 1);

		var blcDate;
		for(i=0, len=res.length; i < len; i++){
			blcDate = new Owndate(res[i].fDateTime);
			balance = {
				type: res[i].fType,
				money: res[i].fMoney>0? ('+'+res[i].fMoney) : res[i].fMoney,
				date: blcDate.returnTime(),
			};

			if(balance.type === '收入') {
				//console.log(res[i].fMoney);
				profit += res[i].fMoney * 100;
			}

			if(blcDate.cmpDate(today)){
				todayShow = true;
				todayBalances.push(balance);
			} else if(blcDate.cmpDate(yesterday)) {
				yesterdayShow = true;
				yesterdayBalances.push(balance);
			} else {
				otherShow = true;
				otherBalances.push(balance);
			}
		}

		$scope.profit = profit/100;
		$scope.todayShow = todayShow;
		$scope.todayBalances = todayBalances;
		$scope.yesterdayShow = yesterdayShow;
		$scope.yesterdayBalances = yesterdayBalances;
		$scope.otherShow = otherShow;
		$scope.otherBalances = otherBalances;
	});
	

}]);