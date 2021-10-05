(function () {

    var app = angular.module("UserApp");

    var SigninController = function ($scope, $http, $location) {

        console.log("entrei no registration page");

        $scope.makeRegister = function (FirstName, LastNAme, UserName, Email, Password, ConfirmPassword, roleButton) {
            console.log("entrei no register page");

            ResgiterUser(FirstName, LastNAme, UserName, Email, Password, ConfirmPassword, roleButton);
        };

        var ResgiterUser = function (FirstName, LastNAme, UserName, Email, Password, ConfirmPassword, roleButton) {

            //let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8080/");
            if (!roleButton) {
                roleButton = "Programer";
            };

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/accounts/create',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "Email": Email,
                    "UserName": UserName,
                    "Password": Password,
                    "ConfirmPassword": ConfirmPassword,
                    "FirstName": FirstName,
                    "LastName": LastNAme,
                    "RoleName": roleButton
                }
            }).then(function (response) {
                $scope.regmsg = "SignIn Made";
                //Return to homepage
                $location.path("/main")
            }, function (response) {
                console.log(response.data);
                $scope.regmsg = "Ups somethin went wrong";
            });
        };
    };

    app.controller("SigninController", SigninController);

}());