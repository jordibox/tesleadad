var adminCtrl = {};
var adminFtry = {};
var adminFiltr = {};
var adminDrctv = {};

var app = angular.module('myAdmin', ["ngRoute"])
	.controller(adminCtrl)
	.factory(adminFtry)
	.filter(adminFiltr)
	.directive(adminDrctv)

	.config(function ($routeProvider, $httpProvider) {

		$routeProvider
			.when("/login", {
				templateUrl: "app/login/main.html",
				controller: "LoginCtrl"

			})
			.otherwise({
				redirectTo: "/login"
			});


		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

	});