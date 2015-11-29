adminCtrl.TabCtrl = function ($rootScope, $scope, $http) {

	$scope.logout = function () {
		$http.get("http://pickyourday.herokuapp.com/api/oauth/logout").then(function successCallback(response) {
			deleteLocal("user");
			$rootScope.go("login");
		}, function errorCallback(response) {

		});
	}
}