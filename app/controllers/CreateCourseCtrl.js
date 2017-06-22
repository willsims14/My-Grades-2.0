"use strict";

angular.module('MyGrades').controller('CreateCourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    'StudentFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory, StudentFactory) {

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

        $scope.course = {};
        $scope.semester_selected = false;


        CourseFactory.getSemesters()
        .then( function(response) {
            $scope.semesters = response.data.results;
            console.log("Semesters: ", $scope.semesters);

        });

      


       
        $scope.create_course = function(event){
            CourseFactory.createCourse($scope.course)
            .then( function(response) {
                if (response.status === 200){
                    StudentFactory.getStudent()
                    .then( function(response) {
                        if (response.status === 200){
                            $location.path(`/profile/${response.data.username}`);
                        }
                    });
                }
            });
        };

        $scope.setSemester = function(semester){
            $scope.semester_selected = true;
            $scope.course.semester = semester;
            $('.dropdown-button').dropdown('close');
        };










}]);


