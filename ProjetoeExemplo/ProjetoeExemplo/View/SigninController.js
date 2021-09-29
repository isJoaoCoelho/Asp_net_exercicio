(function () {

    var app = angular.module("UserApp");

    var SigninController = function ($scope, $http, $location) {

        console.log("entrei no registration page");

        $scope.makeRegister = function (FirstName, LastNAme, UserName, Email, Password, ConfirmPassword) {
            console.log("entrei no register page");

            ResgiterUser(userData);
        };

        var ResgiterUser = function (FirstName, LastNAme, UserName, Email, Password, ConfirmPassword) {

            //let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8080/");

            $http({
                method: 'POST',
                url: 'https://localhost:44366/oauth/token',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: 'Email=' + Email + '&UserName=' + UserName + '&Password=' + Password + '&ConfirmPassword=' + ConfirmPassword +'&FirstName=' + FirstName + '&LastName=' + LastNAme
            }).then(function (response) {
                $scope.regmsg = "SignIn Made";
                //Return to homepage
                $location.path("/main")
            }, function (response) {
                $scope.regmsg = "Ups something went wrong";
            });
        };
    };

    app.controller("SigninController", SigninController);

}());