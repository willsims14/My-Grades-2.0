"use strict";

app.factory("StudentFactory", function(apiUrl, RootFactory, $q, $http){


    let getStudent = function(){
        return $q((resolve, reject) => {
            $http({
                url: `http://localhost:8000/getstudent/${RootFactory.getToken()}/`,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Token " + RootFactory.getToken()
                }
            })
            .then((res) => {
                resolve(res);

            }).catch((error) => {
                reject(error);
            });
        });
    };

    let getStudentCourses = function(student){
        return $q((resolve, reject) => {

            $http({
                url: `http://localhost:8000/student-course/${parseFloat(student.id)}/`,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Token " + RootFactory.getToken()
                }
            })
            .then( (res) => {
                resolve(res);
            }).catch( (error) => {
                reject(error);
            });
        });
    };


    return { getStudent, getStudentCourses };
});
