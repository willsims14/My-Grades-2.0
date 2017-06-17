"use strict";

var app = angular.module('MyGrades', ['ngRoute'])
        .constant('apiUrl', "http://localhost:8000");

angular.module('MyGrades').config(
[
    '$interpolateProvider',
    '$routeProvider',
    function($interpolateProvider, $routeProvider) {

        $interpolateProvider.startSymbol('((');
        $interpolateProvider.endSymbol('))');

        $routeProvider
        .when('/', {
            controller: 'AuthCtrl',
            templateUrl: '/partials/login.html'
        })
        .when('/profile/:username', {
            controller: 'ProfileCtrl',
            templateUrl: '/partials/profile.html'
        })
        .when('/course/:course_id/:course_title/create-assignment/', {
            controller: 'CreateAssignmentCtrl',
            templateUrl: '/partials/create_assignment.html'
        })
        .when('/course/:course_id/:course_title',{
            controller: 'CourseCtrl',
            templateUrl: '/partials/course_detail.html'
        })
        .when('/course/create', {
            controller: 'CreateCourseCtrl',
            templateUrl: '/partials/create_course.html'
        });
    }
]);


