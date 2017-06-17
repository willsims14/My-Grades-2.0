"use strict";

angular.module('MyGrades').controller('CreateAssignmentCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams) {

        $scope.assignment = {};
        $scope.course = $routeParams.course_title

        console.log("CREATE ASSIGNMENT CTRL");
       
        // $scope.create_assignment = function(event){
        //     console.log("Assignment: ", $scope.assignment); 

        //     RootFactory.getApiRoot()
        //     .then( (root) => {
        //         console.log("Root: ", root);

        //         $http({
        //             url: `${apiUrl}/create-assignment/`,
        //             method: "POST",
        //             data: { 
        //                 "title": $scope.assignment.
        //                 "course_number": $scope.assignment.,
        //                 "professor": $scope.assignment.,
        //             },
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //                 'Authorization': "Token " + RootFactory.getToken()
        //             }
        //         }).then( function(res) {
        //                 console.log("New Assignment Response: ", res);
        //                 var user_token = "Token " + RootFactory.getToken();
        //                 if (res.data.token !== "") {
        //                     // $location.path(`/profile/${$scope.user.username}`);
        //                 }
        //         });
        //     });
        //}
}]);
