adminCtrl.LoginCtrl = function ($scope, $http) {

	$scope.user = {};
	$scope.login = function () {
		if ($scope.user.email !== "" && $scope.user.password !== "") {
			$http.post("http://pickyourday.herokuapp.com/oauth").then(function successCallback(response) {
				console.log(response);
			}, function errorCallback(response) {

			});
		}

	}
}