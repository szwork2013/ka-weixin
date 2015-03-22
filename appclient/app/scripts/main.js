'use strict';
require.config({
 	baseUrl: '../../app/scripts/lib',
 	paths: {
 		'app'    : '../app', 	     
 		'angular': 'angular/angular',
 		'angular-ui-router': 'angular-ui-router/angular-ui-router',
 		'angular-touch': 'angular-touch/angular-touch',
 		'angular-animate': 'angular-animate/angular-animate',
 		'domReady': 'requirejs-domready/domReady',
 		'route'   : '../route',
 		'bootstrap': '../bootstrap',
 		'barController'     : '../controllers/bar',
 		'controllers': '../controllers/controllers',
 		'services': '../services/services',
 		'wx'   : 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
        'wxsdk': '../services/wxsdk',
        'parkController': '../controllers/park',
        'parkService' : '../services/park',
        'userInfoService': '../services/user',
        'request' : '../services/request'
 	},
 	shim:{
 		
 		'angular' : { 
 			exports : 'angular'
 		},
 		'angular-touch':{
 			deps: ['angular'],
 			exports : 'angular-touch'
 		},
 		'angular-animate':{
 			deps: ['angular'],
 			exports: 'angular-animate',
 		},
 		'angular-ui-router':{
 			deps: ['angular'],
 			exports: 'angular-ui-router'
 		}
 	}
 	
});


require(['bootstrap','barController','wxsdk','parkController'],function () {
	console.log('手动启动应用');
});
