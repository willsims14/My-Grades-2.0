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

        // Get Student profile
        StudentFactory.getStudent()
        .then( function(response) {
            console.log("Student-Token Response: ", response);
            $scope.student = response.data;

            // Get student's courses
            StudentFactory.getStudentCourses($scope.student)
            .then( function(res) {
                console.log("Courses Response: ", res.data.results);
                $scope.student.courses = res.data.results;
            });
        });




}]);


