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
            $('select').material_select();
        });



        $scope.current_user = $routeParams;

        // Get Student profile
        StudentFactory.getStudent()
        .then( function(response) {
            console.log("Student-Token Response: ", response);
            $scope.student = response.data;

            // Get student's courses
            StudentFactory.getStudentCourses($scope.student)
            .then( function(res) {
                console.log("Courses Response: ", res.data.results);
                $scope.student.courses = res.data.results;


                CourseFactory.getSemesters()
                .then( function(response) {
                    $scope.semesters = response.data.results;

                    CourseFactory.getCourseGrades()
                    .then( function(response3) {
                        // console.log("Response3: ", response3);
                        // console.log("Student Courses: ", $scope.student.courses);
                        var assignmentsByCourse = response3;
                        var courses = $scope.student.courses;
                        var course_id;
                        var i = 0;

                        for(i = 0; i < courses.length; i++){
                            course_id = courses[i].id;
                            courses[i].assignments = assignmentsByCourse[course_id];
                            if(courses[i].assignments === undefined){
                                courses[i].assignments = [];
                            }
                            // console.log("Courses[i].assignments: ", courses[i].assignments);
                        }
                        console.log("STARTING LOOP: ", courses);
                        var numAssignments = 0;
                        var course = {};
                        for(i = 0; i < courses.length; i++){
                            var z = 0;
                            // console.log("Courses[i].length: ", courses[i].length);
                            // console.log("Courses[i].assignments: ", courses[i].assignments);
                            // console.log("Courses[i].assignments.length: ", courses[i].assignments.length);
                            numAssignments = courses[i].assignments.length;
                            course = courses[i];
                            console.log("Courses[i]: ", course);
                            console.log("Number of Assignments: ", numAssignments);


                            var total_possible = 0.0;
                            var total_received = 0.0;
                            while(z < numAssignments){
                                if(course.assignments[z]){
                                    if(course.assignments[z].points_received !== null){
                                        // console.log("NOT NULL", course.assignments[z].points_received);
                                        total_received += parseFloat(course.assignments[z].points_received);
                                        total_possible += parseFloat(course.assignments[z].points_possible);
                                        // parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
                                    }else{ console.log("NULL: ",course.assignments[z].points_received );  }

                                }
                                z++;
                            }
                            console.log("PointsPossible: ", total_possible);
                            console.log("PointsReceived: ", total_received);
                            if(total_possible === 0){
                                courses[i].current_grade = "No Assignments Yet!";
                            }else{
                                var current_grade = parseFloat(((total_received / total_possible) * 100.0).toFixed(2));
                                courses[i].current_grade = current_grade + "%";

                                console.log("CURRENT GRADE: ", courses[i].current_grade);
                                console.log("-----------------------");
                            }

                            // for(var z = 0; z < courses[i].assignments.length)



                        }
                        console.log("END LOOP: ", courses);
                        $scope.courses = courses;


                    });

                });
            });
        });


        $scope.setSemesterFilter = function(selected_semester){
            $scope.semester_filter = selected_semester;
            console.log("$scope.semester: ", $scope.semester_filter);

        };






}]);


