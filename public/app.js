var adminCtrl = {};
var adminFtry = {};
var adminFiltr = {};
var adminDrctv = {};

var app = angular.module('myAdmin', ['ui.router'])
	.controller(adminCtrl)
	.factory(adminFtry)
	.filter(adminFiltr)
	.directive(adminDrctv)

	.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


		$stateProvider
			.state("login", {
				url: "/login",
				onEnter: function ($rootScope) {
					if (getJSONLocal("user")) {
						
						$rootScope.go("app");
					}
				},
				templateUrl: 'app/login/main.html',
				controller: 'LoginCtrl'

			})
			.state("app", {
				url: '/',
				onEnter: function ($rootScope) {
					if (!getJSONLocal("user")) {
						
						$rootScope.go("login");
					}
				},
				templateUrl: 'app/main.html',
				controller: 'TabCtrl'
			})


		$urlRouterProvider.otherwise("/login");
		$httpProvider.interceptors.push('AuthInterceptor');

	})

	.run(function ($rootScope, $state) {

		$rootScope.go = function (state, params) {
			$state.go(state, params);
		}

		




	});