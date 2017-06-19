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

        console.log("CREATE ASSIGNMENT CTRL");
       
        $scope.create_assignment = function(){
            $scope.assignment.course = parseInt($scope.course_id);
            AssignmentFactory.createAssignment($scope.assignment)
            .then( function(response) {
                if (response.status === 200){
                    $location.path(`/course/${$scope.course_id}/${$scope.course}`);
                    console.log("Response: ", response);
                }else{
                    console.log("Create Assignment Error");
                }
            });

        };








}]);
