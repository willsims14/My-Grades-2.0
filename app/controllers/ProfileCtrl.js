"use strict";

angular.module('MyGrades').controller('ProfileCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams) {

    console.log("API URL (PROFILE): ", apiUrl);

    $scope.current_user = $routeParams;

    console.log("Token: ", $scope.current_user);

     RootFactory.getApiRoot()
    .then( (root) => {
        console.log("Root: ", root);
        $http({
            url: `http://localhost:8000/student/detail/${$scope.current_user.username}/`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + RootFactory.getToken()
            },
            params:{
                'username': $scope.current_user.username
        }
        }).then( function(res) {
            console.log("Response: ", res);
            $scope.student = res.data.results[0];


            $http({
            url: `http://localhost:8000/student-courses/`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + RootFactory.getToken()
            },
            params:{
                'student_id': parseFloat($scope.student.id)
            }
            }).then( function(res) {
                console.log("Courses Response: ", res);
                $scope.student.courses = res.data.results;
            });
        });

    });
   

}]);


