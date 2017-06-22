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
    'AuthFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory, AssignmentFactory, AuthFactory) {

        $scope.is_loading = true;

        // jQuery for Materialize components
        $('.change-grade-inputs').hide();

        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});


        });

        // Scope Variables
        $scope.changingGrade = false;
        $scope.course = {};
        $scope.course.title = $routeParams.course_title;
        $scope.course.id = $routeParams.course_id;
        $scope.no_assignments = false;


        // Gets authenticated student's courses and assignments 
        //  and then calculates each course's grade
        $scope.loadCourse = function(){

            CourseFactory.getCourseAssignments($scope.course.id)
            .then( function(res) {
                if(!res.data.length){
                    $scope.no_assignments = true;
                    $scope.is_loading = false;
                }else{
                    
                    // $scope.assignments = res.data.results;
                    $scope.assignments = res.data;
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

                    $scope.is_loading = false;
                }
            });

        };


        // Deletes a student's course (and all assignments tied to it)
        $scope.deleteCourse = function(course_id) {
            CourseFactory.deleteCourse(course_id)
            .then( function(res) {
                if(res.status === 204){
                    Materialize.toast('Deleted Course', 5000);
                    $location.path(`/profile/${AuthFactory.getCurrentUser()}`);
                }
            });
        };

        // Deletes a student's assignment
        $scope.deleteAssignment = function(assignment_id) {
            AssignmentFactory.deleteAssignment(assignment_id)
            .then( function(res) {
                if (res.status === 204){
                    Materialize.toast('Succesfully Deleted Assignment', 5000);
                    CourseFactory.getCourseAssignments($scope.course.id)
                    .then( function(res) {
                        $scope.assignments = res.data;
                        $scope.loadCourse();
                    });
                }
            });
        };

        // Activates hidden input box to collect student's new grade for selected assignment
        $scope.showChangeAssignmentGradeInput = function(assignment_id, points_possible){
            $scope.changingGrade = true;
            $scope.changePointsPossible = points_possible;
            $scope.assignmentToChange = assignment_id;
        };

        // Will eventually make a PATCH request to chosen assignments
        $scope.changeAssignmentGrade = function(assignment_id){
            $scope.changingGrade = false;

        };

        $scope.loadCourse();
}]);
