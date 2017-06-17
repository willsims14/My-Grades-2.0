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

        console.log("User: ", $scope.current_user);
        console.log("Token: ", RootFactory.getToken());

        //  RootFactory.getApiRoot()
        // .then( (root) => {
        //     console.log("Root: ", root);
        //     $http({
        //         url: `http://localhost:8000/getstudent/${RootFactory.getToken()}/`,
        //         headers: {
        //             "Content-Type": "application/json",
        //             'Authorization': "Token " + RootFactory.getToken()
        //         }
        //     }).then( function(response) {
        //         console.log("Token Response: ", response);
        //     });


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
            console.log("User Response: ", res.data.results);
            $scope.student = res.data.results[0];


            $http({
            url: `http://localhost:8000/student-course/`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + RootFactory.getToken()
            },
            params:{
                'student_id': parseFloat($scope.student.id)
            }
            }).then( function(res) {
                console.log("Courses Response: ", res.data.results);
                $scope.student.courses = res.data.results;
            });
        });

    });
   

}]);


