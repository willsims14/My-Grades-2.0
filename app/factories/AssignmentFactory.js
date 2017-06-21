"use strict";


app.factory("AssignmentFactory", function(apiUrl, RootFactory, $q, $http){




    let createAssignment = function(assignment){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/assignment/new/${assignment.course}/`,
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

    // url(r'^student/detail/', views.StudentDetailViewSet.as_view()),
    // url(r'^getstudent/(?P<token>\w+)/', views.GetStudentByTokenView.as_view()),