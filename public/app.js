var adminCtrl = {};
var adminFtry = {};
var adminFiltr = {};
var adminDrctv = {};

var app = angular.module('myAdmin', ['ui.router'])
	.controller(adminCtrl)
	.factory(adminFtry)
	.filter(adminFiltr)
	.directive(adminDrctv)

	.config(function ($stateProvider, $urlRouterProvider) {
		

		$stateProvider
			.state("login", {
				url: "/login",

				templateUrl: 'app/login/main.html',
				controller: 'LoginCtrl'

			});
			

		$urlRouterProvider.otherwise("/login");


	})
	
	.run(function($rootScope, $state){
		
		$rootScope.go=function(state, params){
			$state.go(state, params);
		}
	});