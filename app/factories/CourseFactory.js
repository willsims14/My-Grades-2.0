"use strict";

/*****************************************************/
/***************    Course Factory     ***************/
/***   Handles database interactions for courses   ***/
/*****************************************************/


app.factory("CourseFactory", function(apiUrl, RootFactory, $q, $http){

    //  Gets the specigied Course's StudentCourseAssignment instances
    let getCourseAssignments = function(course_id){
        return $q((resolve, reject) => {
        RootFactory.getApiRoot()
        .then( (root) => {
                $http({
                    url: `http://localhost:8000/course/${course_id}/assignments/`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Token " + RootFactory.getToken()
                    },
                    params:{
                        'course_id': parseFloat(course_id)
                    }
                })
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    };

    // Gets all StudentCourseAssignment instances for the authenticated student
    let getCourseGrades = function(){
        return $q((resolve, reject) => {
        RootFactory.getApiRoot()
        .then( (root) => {
                $http({
                    url: `http://localhost:8000/course-assignments/`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                })
                .then((res) => {
                    console.log("Factory Response: ", res);
                    // var assignments = res.data.results;
                    var assignments = res.data;
                    var courses = {};
                    var i;
                    if(assignments){
                        for(i = 0; i < assignments.length; i++){
                            courses[assignments[i].student_course] = [];
                        }
                        for(i = 0; i < assignments.length; i++){
                            courses[assignments[i].student_course].push(assignments[i]);
                        }
                        resolve(courses);
                    }else{
                        console.log("UH OJ");
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    };

    // Create a new Course and StudentCourse instances
    let createCourse = function(course){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/course/create/`,
                    method: "POST",
                    data: { 
                        "title": course.title,
                        "course_number": course.course_number,
                        "professor": course.professor,
                        "semester": course.semester.id,
                        "description": course.description
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                }).then( function(res){
                    resolve(res);
                }).catch( function(error){
                    reject(error);
                });
            });
        });
    };

    // Deletes the specified Course and StudenCourse instances 
    let deleteCourse = function(course_id){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                $http({
                    url: `http://localhost:8000/course/delete/${course_id}/`,
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + RootFactory.getToken()
                    }
                }).then( function(response) {
                    if (response.status === 204){
                        resolve(response);
                    }else{ reject(response); }
                }).catch( function(error) {
                    reject(error);
                });

            });
        });
    };

    //  Gets all Semester instsances
    let getSemesters = function(){
        return $q((resolve, reject) => {
            $http({
                    url: `http://localhost:8000/semesters/`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                }).then( function(response) {
                    resolve(response);
                }).catch( function(error) {
                    reject(error);
                });
        });
    };

    return { getCourseAssignments, deleteCourse, createCourse, getSemesters, getCourseGrades };

});