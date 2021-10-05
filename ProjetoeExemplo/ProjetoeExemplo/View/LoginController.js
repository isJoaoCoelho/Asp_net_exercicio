(function() {

    var app = angular.module("UserApp");

    var LoginController = function ($scope, $http, $location) {

        console.log("entrei no login page");

        //$scope.errormsg = "error";

        $scope.makelogin = function(emailuser,passworduser){
          console.log("entrei no login page");
              //$scope.errormsg = emailuser + " " + passworduser;
              getLoginTokens(emailuser,passworduser);
              //getusers(emailuser);

              // return $http.get("https://api.github.com/users/" + username)
              //             .then(function(response){
              //                return response.data;
              //             });
        };


        var getLoginTokens = function(emailuser, passworduser){

          //let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8080/");

          $http({
            method: 'POST',
            url: 'https://localhost:44366/oauth/token',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
              data: 'grant_type=password&username=' + emailuser + '&password=' + passworduser
          }).then(function (response) {
              document.cookie = "token=" + response.data.access_token;
              document.cookie = "Username=" + emailuser;
              checkRole(response.data.access_token);
                //Return to homepage
              $location.path("/main")
          }, function (response) {
              $scope.errormsg = "Wrong Password/User";
          });
        };

        var checkRole = function (token) {

            $http({
                method: 'GET',
                url: 'https://localhost:44366/api/accounts/GetRole',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                document.cookie = "Role=" + response.data;

            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });


        };


        var getusers = function(username){
            var repoUrl = "https://localhost:44366/api/accounts/users";
            $http.get(repoUrl)
                        .then(function(response){
                            console.log(response);
                        })
                        .then(function(response){
                            console.log(response);
                        });
        };


    };

    app.controller("LoginController", LoginController);

}());
