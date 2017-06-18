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
                        console.log("TOKEN GOOD");
                        GLOBAL_USER = $scope.user;
                        $location.path(`/profile/${$scope.user.username}`);

                    }else{
                        console.log("TOKEN BAD");
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


