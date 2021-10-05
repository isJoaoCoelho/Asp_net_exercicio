(function(){

    var app = angular.module("UserApp", ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
             .when("/Projects", {
                 templateUrl: "Projects/ProjectMain.html",
                 controller: "ProjectMainController"
             })
            .when("/Projects/Create", {
                templateUrl: "Projects/ProjectCreate.html",
                controller: "ProjectMainController"
            })
            .when("/Tasks/Create", {
                templateUrl: "Tasks/TaskCreate.html",
                controller: "TaskMainController"
            })
             .when("/Tasks", {
                 templateUrl: "Tasks/TaskMain.html",
                 controller: "TaskMainController"
             })
             .when("/Singin", {
                 templateUrl: "signin.html",
                 controller: "SigninController"
             })
            .when("/login", {
                templateUrl: "login.html",
                controller: "LoginController"
            })
            .when("/user", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .otherwise({redirectTo:"/main"});
    });

}());
