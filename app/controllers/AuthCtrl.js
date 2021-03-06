"use strict";

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    'AuthFactory',
    '$route',
    function($scope, $http, $location, RootFactory, apiUrl, AuthFactory, $route) {

        $scope.is_new_user = false;
        $scope.invalid_login = false;

        $scope.user = {};

        // Register new users
        // ( Creates User instance which signals creation of Student instance )
        $scope.register = function(){
            AuthFactory.registerUser($scope.new_user)
            .then( function(response) {
                if(response.data.token !== ""){
                    $location.path(`/profile/${$scope.new_user.username}`);
                }
            });
        };

        // Login user
        $scope.login = function(){
            if($scope.user.username && $scope.user.password){
                AuthFactory.loginUser($scope.user)
                .then( function(res) {
                    if(res.data.token !== ""){
                        $scope.invalid_login = false;
                        AuthFactory.setCurrentUser($scope.user);
                        $location.path(`/profile/${$scope.user.username}`);
                    }
                });
            }else{
                $scope.invalid_login = true;
            }
        };

        // Re-route URL to user profile
        $scope.goToUserProfile = function(){
            let CURRENT_USER = AuthFactory.getCurrentUser();
            $location.path(`/profile/${CURRENT_USER.username}`);
        };

        // Logs out user
        $scope.logout = function(){
            $location.path(`/`);
            $route.reload();
        };

}]);


