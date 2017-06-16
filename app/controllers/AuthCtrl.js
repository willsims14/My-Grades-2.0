"use strict";

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    function($scope, $http, $location, RootFactory, apiUrl) {


    console.log("API URL: ", apiUrl);


    $scope.register = function() {

        $http({
            url: `${apiUrl}/register`,
            method: "POST",
            data: {
                "username": $scope.new_user.username,
                "password": $scope.new_user.password
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
                    // $cookie.write
                    $location.path(`/profile/${$scope.user.username}`);
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

}]);


