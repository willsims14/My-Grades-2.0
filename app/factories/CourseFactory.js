"use strict";



app.factory("CourseFactory", function(apiUrl, RootFactory, $q, $http){


    let getCourse = function(course_id){
        return $q((resolve, reject) => {
        RootFactory.getApiRoot()
        .then( (root) => {
                $http({
                    url: `http://localhost:8000/student-course-assignments/`,
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

    let createCourse = function(course){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/create-course/`,
                    method: "POST",
                    data: { 
                        "title": course.title,
                        "course_number": course.course_number,
                        "professor": course.professor,
                        "semester": course.semester
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

    let deleteCourse = function(course_id){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                $http({
                    url: `http://localhost:8000/student-course-delete/${course_id}/`,
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



    return { getCourse, deleteCourse, createCourse, getSemesters };

});