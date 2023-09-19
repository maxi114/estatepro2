(function () {
    //define the controller and set the
    const app = angular.module('app', ['ngRoute', 'angular-jwt']);

    //include cross domains
    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true)

        //home page
        $routeProvider.when('/', {
            templateUrl: "./home.html",
            controller: "HomeController",
            controllerAs: "vm",
        })

         //about page
         $routeProvider.when('/about', {
            templateUrl: "./about.html",
            controller: "AboutController",
            controllerAs: "vm",
        })

         //post page
         $routeProvider.when('/post', {
            templateUrl: "./post.html",
            controller: "PostController",
            controllerAs: "vm",
        })

    });

    //home controller
    app.controller("HomeController", HomeController);
    function HomeController($location, $scope, $window, $http) {

        var vm = this

    }

     //about controller
     app.controller("AboutController", AboutController);
     function AboutController($location, $scope, $window, $http) {
 
         var vm = this
 
     }
 
     //post controller
     app.controller("PostController", PostController);
     function PostController($location, $scope, $window, $http) {
 
         var vm = this
 
     }


}())