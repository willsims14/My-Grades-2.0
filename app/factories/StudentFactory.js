"use strict";

/****************************************************************/
/*********************    Student Factory     *******************/
/***   Handles database interactions for Student instances    ***/
/****************************************************************/

app.factory("StudentFactory", function(apiUrl, RootFactory, $q, $http){

    // Uses current Token to retrieve Student information (called after login)
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

    // Get all StudentCourse instances for authenticated Student
    let getStudentCourses = function(student){
        return $q((resolve, reject) => {
            $http({
                url: `http://localhost:8000/course/get/${parseFloat(student.id)}/`,
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
