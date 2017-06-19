"use strict";

angular.module('MyGrades').controller('CourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    'AssignmentFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory, AssignmentFactory) {

        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});


        });


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
                    Materialize.toast('Deleted Course', 5000);
                }else{ console.log("Delete Unsuccesful"); }
            });
        };

        $scope.deleteAssignment = function(assignment_id) {
            AssignmentFactory.deleteAssignment(assignment_id)
            .then( function(res) {
                if (res.status === 204){
                    Materialize.toast('Deleted Assignment', 5000);
                    CourseFactory.getCourse($scope.course.id)
                    .then( function(res) {
                        $scope.assignments = res.data.results;
                    });
                }else{ console.log("Assignment Delete Failure"); }
            });
        };



}]);
