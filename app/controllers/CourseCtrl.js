"use strict";

angular.module('MyGrades').controller('CourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory) {

        $scope.course = {};
        $scope.course.title = $routeParams.course_title;
        $scope.course.id = $routeParams.course_id;

        CourseFactory.getCourse($scope.course.id)
        .then( function(res) {
            $scope.assignments = res.data.results;
        });




        $scope.deleteCourse = function(course_id) {
            CourseFactory.deleteCourse(course_id)
            .then( function(res) {
                if(res.status === 204){
                    console.log("Delete Succesful");
                }else{ console.log("Delete Unsuccesful"); }
            });
        };



}]);
