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

        $scope.course = {};

       
        $scope.create_course = function(event){
            CourseFactory.createCourse($scope.course)
            .then( function(response) {
                if (response.status === 200){
                    StudentFactory.getStudent()
                    .then( function(response) {
                        if (response.status === 200){
                            $location.path(`/profile/${response.data.username}`)
                        }
                    });
                }
            });
        };










}]);


