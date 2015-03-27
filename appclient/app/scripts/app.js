var kapark = angular.module('kapark', ['ui.router', 
		'indexModule', 'parkDetailModule', 'queryParkModule', 
		'histroyModule', 'walletModule', 'parkManegeModule', 
		'timesetModule', 'addParkDetailModule', 'bookParkingModule', 'ipCookie', 'signupModule', 'filters', 'services']);

kapark.run( ['$rootScope','$state','$stateParams','$location','User','Wxsdk','ipCookie', function($rootScope, $state, $stateParams,$location,User,Wxsdk, ipCookie) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	$rootScope.$on("$stateChangeStart", function(event, next, current) {
		if(ipCookie('strUserName') && next.url === '/signup') {
			$location.path('/index');
		} else if(!ipCookie('strUserName') && next.url !== '/signup') {
			$location.path('/signup');
		}
	});

}]);

//配置路由
kapark.config( function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/signup');
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: '/views/index.html'
		})
		.state('histroy', {
			url: '/histroy',
			templateUrl: '/views/histroy.html'
		})
		.state('parkDetail', {
			url: '/parkDetail/:parkId',
			templateUrl: '/views/parkDetail.html'
		})
		.state('parkManege', {
			url: '/parkManege',
			templateUrl: '/views/parkManege.html'
		})
		.state('queryPark', {
			url: '/queryPark',
			templateUrl: '/views/queryPark.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/views/signup.html'
		}).state('timeset', {
			url: '/timeset/:parkDetailId',
			templateUrl: '/views/timeset.html'
		}).state('wallet', {
			url: '/wallet',
			templateUrl: '/views/wallet.html'
		}).state('addParkDetail', {
			url: '/addParkDetail',
			templateUrl: '/views/addParkDetail.html'
		}).state('bookParking', {
			url: '/bookParking/:iParkDetailID',
			templateUrl: '/views/bookParking.html',
		})
});