"use strict";

angular.module('MyGrades').controller('CreateCourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams) {

        $scope.course = {};

       
        $scope.create_course = function(event){
            console.log("Course: ", $scope.course); 

            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/create-course/`,
                    method: "POST",
                    data: { 
                        "title": $scope.course.title,
                        "course_number": $scope.course.course_number,
                        "professor": $scope.course.professor,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                }).then(
                    res => {
                        console.log("Response!!!: ", res);
                        var user_token = "Token " + RootFactory.getToken();
                        console.log("Response Token: ", res.data);
                        console.log("RootFactory Token: ", user_token);
                        if (res.data.token !== "") {

                            // $location.path(`/profile/${$scope.user.username}`);
                        }
                });
            });
        };
}]);
