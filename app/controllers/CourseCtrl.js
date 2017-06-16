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

        //  RootFactory.getApiRoot()
        // .then( (root) => {
        //     console.log("Root: ", root);
        //     $http({
        //         url: `http://localhost:8000/student/detail/${$scope.current_user.username}/`,
        //         headers: {
        //             "Content-Type": "application/json",
        //             'Authorization': "Token " + RootFactory.getToken()
        //         },
        //         params:{
        //             'username': $scope.current_user.username
        //     }
        //     }).then( function(res) {
        //         console.log("Response: ", res);
        //         $scope.student = res.data.results[0];


            
        //     });

        // });
       

}]);
