"use strict";

angular.module('MyGrades').controller('ProfileCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'StudentFactory',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, StudentFactory, CourseFactory) {

        $( document ).ready( function(){
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 5, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });
        });

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
                CourseFactory.getSemesters()
                .then( function(response) {
                    $scope.semesters = response.data.results;
                });
            });
        });


        $scope.setSemesterFilter = function(selected_semester){
            $scope.semester_filter = selected_semester;
            console.log("$scope.semester: ", $scope.semester_filter);

        };




}]);


