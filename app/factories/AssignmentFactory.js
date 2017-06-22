"use strict";

/*******************************************************************/
/********************    Assignment Factory     ********************/
/***    Handles database interactions for Assignment instances   ***/
/*******************************************************************/

app.factory("AssignmentFactory", function(apiUrl, RootFactory, $q, $http){

    // Creates new Assignment and StudentCourseAssignment instance in DB
    let createAssignment = function(assignment){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/assignment/create/${assignment.course}/`,
                    method: "POST",
                    data: { 
                        "title": assignment.title,
                        "course": assignment.course,
                        "points_possible": assignment.points_possible,
                        "points_received": assignment.points_received,
                        "description": assignment.description 
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

    // Deletes specified StudentCourseAssignment and Assignment instances
    let deleteAssignment = function(assignment_id){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                $http({
                    url: `http://localhost:8000/assignment/delete/${assignment_id}/`,
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

    return { createAssignment, deleteAssignment };

});
