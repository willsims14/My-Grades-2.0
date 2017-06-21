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

        $('.change-grade-inputs').hide();

        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});


        });

        $scope.changingGrade = false;
        $scope.course = {};
        $scope.course.title = $routeParams.course_title;
        $scope.course.id = $routeParams.course_id;

        CourseFactory.getCourse($scope.course.id)
        .then( function(res) {
            $scope.assignments = res.data.results;
            console.log("Assignments: ", $scope.assignments);
            var totalPointsReceived = 0.0;
            var totalPointsPossible = 0.0;
            var allTotalPointsPossible = 0.0;
            for(var i = 0; i < $scope.assignments.length; i++){
                if ($scope.assignments[i].points_received !== null){
                    totalPointsReceived += parseFloat($scope.assignments[i].points_received);
                    totalPointsPossible += parseFloat($scope.assignments[i].points_possible);
                }
                allTotalPointsPossible += parseFloat($scope.assignments[i].points_possible);
            }

            // parseFloat(((total_received / total_possible) * 100.0).toFixed(2));
            $scope.totalPointsPossible = totalPointsPossible.toFixed(2);
            $scope.totalPointsReceived = totalPointsReceived.toFixed(2);
            $scope.allTotalPointsPossible = allTotalPointsPossible.toFixed(2);



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

        $scope.showChangeAssignmentGradeInput = function(assignment_id, points_possible){
            $scope.changingGrade = true;
            $scope.changePointsPossible = points_possible;
            $scope.assignmentToChange = assignment_id;
        };


        /*********************************/
        /*********************************/
        /****   UPDATE STUDENT GRADE   ***/
        /*********************************/
        /*********************************/


        $scope.changeAssignmentGrade = function(assignment_id){

            console.log("Assignment To Change: ", $scope.assignmentToChange);
            // console.log("Old Grade to Change: ", );
            console.log("New Grade to Change to: ", $scope.new_grade);

            $scope.changingGrade = false;

        };



}]);
