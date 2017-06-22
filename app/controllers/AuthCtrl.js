"use strict";

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    'AuthFactory',
    function($scope, $http, $location, RootFactory, apiUrl, AuthFactory) {

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
            AuthFactory.loginUser($scope.user)
            .then( function(res) {
                if(res.data.token !== ""){
                    AuthFactory.setCurrentUser($scope.user)
                    $location.path(`/profile/${$scope.user.username}`);
                }
            });
        };

        $scope.quick_login = function(){
            $scope.user = { username: "will2", password: "sims" };
            AuthFactory.setCurrentUser($scope.user)
            $scope.login();
        };

        // Re-route URL to user profile
        $scope.goToUserProfile = function(){
            let CURRENT_USER = AuthFactory.getCurrentUser();
            $location.path(`/profile/${CURRENT_USER.username}`);
        };


}]);


