(function () {

    var app = angular.module("UserApp");

    var UserController = function ($scope, $window, $location) {

        $scope.username = "";

        $scope.Logoff = function () {
            console.log("Estou a fazer logg off");


            delete_cookie("Username");
            delete_cookie("token");

            $window.location.href = "#/main.html"
        };

        var delete_cookie = function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };


        var checklogin = function () {
            let cookies = document.cookie;
            var arraycookies = cookies.split(';');
            for (var i = 0; i < arraycookies.length; i++) {
                if (arraycookies[i].includes("Username")) {
                    $scope.username = "Logged in to " + arraycookies[i].split('=')[1];
                    $scope.autenticated = true;
                    return;
                }
            }
            $scope.username = "Not logged in";
        };


        checklogin();
        //startCountdown();
    };

    app.controller("UserController", UserController);

}());