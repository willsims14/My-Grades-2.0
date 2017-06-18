"use strict";

angular.module('MyGrades').controller('ProfileCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'StudentFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, StudentFactory) {


        $scope.current_user = $routeParams;

        console.log("CurrentUserID: ", $scope.current_user);

        StudentFactory.getStudent()
        .then( function(response) {
            console.log("Student-Token Response: ", response);
            $scope.student = response.data;

            // Get student's courses
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

        // });
}]);


