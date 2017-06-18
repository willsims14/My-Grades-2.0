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

        console.log("CREATE ASSIGNMENT CTRL");
       
        $scope.create_assignment = function(event){
            

        };








}]);
