"use strict";

angular.module('MyGrades').controller('ProfileCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'StudentFactory',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, StudentFactory, CourseFactory) {

        /***************************************************/
        /*  Initialize Materialize components with jQuery  */
        /***************************************************/

        // Initializes collapsible course list
        $( document ).ready( function(){
            $('.collapsible').collapsible({
                accordion: true, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                onOpen: function(el) { 
                    console.log("OPENED");
                    alert('Open'); 
                },
                onClose: function(el) { 
                    console.log("CLOSED");
                    alert('Closed'); 
                } 
              });
            // Initializes semester dropdown to filter courses
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });
            // $('select').material_select();
        });



        $scope.current_user = $routeParams;

        // Get Student profile
        StudentFactory.getStudent()
        .then( function(response) {
            $scope.student = response.data;

            // Get student's courses
            StudentFactory.getStudentCourses($scope.student)
            .then( function(res) {
                $scope.student.courses = res.data;

                CourseFactory.getSemesters()
                .then( function(response) {
                    console.log("RESPONSE: ", response);
                    $scope.semesters = response.data.results;

                    CourseFactory.getCourseGrades()
                    .then( function(response3) {
                        console.log("Response3: ", response3);
                        var assignmentsByCourse = response3;
                        var courses = $scope.student.courses;
                        console.log("Courses: ", courses);
                        var course_id;
                        var i = 0;

                        for(i = 0; i < courses.length; i++){
                            course_id = courses[i].id;
                            courses[i].assignments = assignmentsByCourse[course_id];
                            if(courses[i].assignments === undefined){
                                courses[i].assignments = [];
                            }
                        }
                        var numAssignments = 0;
                        var course = {};
                        for(i = 0; i < courses.length; i++){
                            // Temporary Variables for each loop iteration
                            var total_possible = 0.0;
                            var total_received = 0.0;
                            var z = 0;
                            numAssignments = courses[i].assignments.length;
                            course = courses[i];

                            // Loop through each courses assignments
                            while(z < numAssignments){
                                if(course.assignments[z]){
                                    // If the course has 1 or more assignments
                                    if(course.assignments[z].points_received !== null){
                                        // Add the assignments point values to respective running sum
                                        total_received += parseFloat(course.assignments[z].points_received);
                                        total_possible += parseFloat(course.assignments[z].points_possible);
                                    }

                                }
                                z++; // Increment counter variable
                            }
                            if(total_possible === 0){ // If total_possible was not added on to
                                courses[i].current_grade = "No Assignments Yet!";
                            }else{
                                var current_grade = parseFloat(((total_received / total_possible) * 100.0).toFixed(2));
                                courses[i].current_grade = current_grade + "%";
                            }
                        }
                        // Set scope variable
                        $scope.courses = courses;
                    });

                });
            });
        });


        $scope.setSemesterFilter = function(selected_semester){

            $scope.semester_filter = selected_semester.season;
            console.log("$scope.semester: ", $scope.semester_filter);

        };






}]);


