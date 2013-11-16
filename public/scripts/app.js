angular.module('videochatApp', ['ngResource', 'ngRoute', 'ui.bootstrap'])
	.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: 'views/index.html',
				controller: 'IndexCtrl'
			})
			.otherwise({redirectTo: '/'});
	});
