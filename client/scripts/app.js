var myApp = angular.module('myApp', []);

myApp.controller("MyController", ["$scope", "$http", function($scope, $http){

    $scope.info = {};
    $scope.nameArray = [];

    $scope.getPeople = function(){
        $http.get('/people').then(function(res){
            console.log(res.data);
        });
    };



  $scope.getPeople();

}]);

