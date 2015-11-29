var app = angular.module('myAdmin', []);
app.controller('formCtrl', function($scope) {
   $scope.login = function(){
   		console.log($scope.user);
   }
});