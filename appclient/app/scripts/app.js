var kapark = angular.module('kapark', ['ui.router', 
		'indexModule', 'parkDetailModule', 'queryParkModule', 
		'histroyModule', 'walletModule', 'parkManegeModule', 
		'timesetModule', 'addParkDetailModule', 'ipCookie', 'signupModule', 'filters', 'services']);

kapark.run( function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

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
		})
});