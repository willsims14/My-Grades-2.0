"use strict";

var GLOBAL_USER = {};

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    function($scope, $http, $location, RootFactory, apiUrl) {

        $scope.register = function() {
            $http({
                url: `${apiUrl}/register`,
                method: "POST",
                data: {
                    "username": $scope.new_user.username,
                    "password": $scope.new_user.password,
                    "first_name": $scope.new_user.first_name,
                    "last_name": $scope.new_user.last_name
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'Authorization': "Token " + RootFactory.getToken()
                }
            }).then(
                res => {
                    RootFactory.setToken(res.data.token);
                    console.log("Data: ", res);
                    if(res.data.token !== ""){
                        $location.path(`/profile/${$scope.new_user.username}`);
                    }
                },
                console.error
            );
        };

        $scope.login = function() {
            $http({
                url: `${apiUrl}/api-token-auth/`,
                method: "POST",
                data: {
                    "username": $scope.user.username,
                    "password": $scope.user.password
                },
            }).then(
                res => {
                    console.log("RESPONSE: ", res);
                    RootFactory.setToken(res.data.token);
                    if (res.data.token !== "") {
                        $location.path(`/profile/${$scope.user.username}`);
                        GLOBAL_USER = $scope.user;

                    }
                },
            console.error
            );
        };

        $scope.quick_login = function(){
            $scope.user = {
                username: "will",
                password: "sims"
            };
            $scope.login();
        };

        $scope.getUserProfile = function(){
            $location.path(`/profile/${GLOBAL_USER.username}`);
        };


}]);


