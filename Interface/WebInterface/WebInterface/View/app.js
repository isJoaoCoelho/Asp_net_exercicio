(function(){

    var app = angular.module("UserApp", ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
             .when("/Projects", {
                 templateUrl: "main.html",
                 controller: "MainController"
             })
             .when("/Tasks", {
                 templateUrl: "main.html",
                 controller: "MainController"
             })
             .when("/Singin", {
                 templateUrl: "signin.html",
                 controller: "SigninController"
             })
            .when("/login", {
                templateUrl: "login.html",
                controller: "LoginController"
            })
            .otherwise({redirectTo:"/main"});
    });

}());
