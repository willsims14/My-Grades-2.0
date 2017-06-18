"use strict";

angular.module('MyGrades').controller('CreateCourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory) {

        $scope.course = {};

       
        $scope.create_course = function(event){
            CourseFactory.createCourse($scope.course)
            .then( function(response) {
                console.log("Create Course Response: ", response);
            });
        };










}]);


