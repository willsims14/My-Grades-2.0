"use strict";

var GLOBAL_USER = {};

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    'AuthFactory',
    function($scope, $http, $location, RootFactory, apiUrl, AuthFactory) {

        $scope.register = function(){
            AuthFactory.registerUser($scope.new_user)
            .then( function(response) {
                if(response.data.token !== ""){
                    $location.path(`/profile/${$scope.new_user.username}`);
                }else{ console.log("TOKEN INVALID"); }
            });
        };

        $scope.login = function(){
            AuthFactory.loginUser($scope.user)
            .then( function(res) {
                if(res.data.token !== ""){
                    GLOBAL_USER = $scope.user;
                    $location.path(`/profile/${$scope.user.username}`);
                }else{ console.log("INVALID TOKEN"); }
            });
        };

        $scope.quick_login = function(){
            $scope.user = { username: "will", password: "sims" };
            $scope.login();
        };

        $scope.goToUserProfile = function(){
            $location.path(`/profile/${GLOBAL_USER.username}`);
        };


}]);


