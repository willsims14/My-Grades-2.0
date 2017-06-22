"use strict";

angular.module('MyGrades').controller('CreateAssignmentCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'AssignmentFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, AssignmentFactory) {

        $scope.assignment = {};
        $scope.course = $routeParams.course_title;
        $scope.course_id = $routeParams.course_id;
        $scope.points_value_error = false;

        // Creates a new Assignment and StudentCourseAssignment instance
        $scope.create_assignment = function(){

            if($scope.assignment.points_received > $scope.assignment.points_possible){
                $scope.points_value_error = true;
            }else{
                $scope.points_value_error = false;
                $scope.assignment.course = parseInt($scope.course_id);
                AssignmentFactory.createAssignment($scope.assignment)
                .then( function(response) {
                    if (response.status === 200){
                        $location.path(`/course/${$scope.course_id}/${$scope.course}`);
                    }
                });
            }

        };








}]);
