"use strict";

angular.module('MyGrades').controller('CourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams) {

        $scope.course = {}
        $scope.course.title = $routeParams.course_title;
        $scope.course.id = $routeParams.course_id

        console.log("Course: ", $scope.course);

        RootFactory.getApiRoot()
        .then( (root) => {
            console.log("Root: ", root);
            

            $http({
            url: `http://localhost:8000/student-course-assignments/`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + RootFactory.getToken()
            },
            params:{
                'course_id': parseFloat($scope.course.id)
            }
            }).then( function(res) {
                console.log("Assignment Response: ", res.data);
                $scope.assignments = res.data.results;
            });
        });
       
}]);
