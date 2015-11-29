adminCtrl.LoginCtrl = function ($scope, $http) {

	$scope.user = {};
	$scope.login = function () {
		if ($scope.user.email !== "" && $scope.user.password !== "") {
			$http.get("http://pickyourday.herokuapp.com").then(function successCallback(response) {
				console.log(response);
			}, function errorCallback(response) {

			});
		}

	}
}