(function () {

    var app = angular.module("UserApp");

    var ProjectMainController = function ($scope, $http, $location, $routeParams) {

        $scope.error = "Loading";

        var getProjects = function () {

            var ProjectsUrl = "https://localhost:44366/api/projects/projects";

            return $http.get(ProjectsUrl)
                .then(function (response) {
                    $scope.data = response.data;
                    //console.log(response.data);
                })
                .then(function (response) {
                    //$scope.error = "An error occour getting";
                });

        };

        $scope.CreateProject = function (selectedItem, ProjectName, Budget) {

            // calls function to put value
            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/projects/createProject',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "UserId": selectedItem,
                    "ProjName": ProjectName,
                    "Budget": Budget
                }
            }).then(function (response) {
                //document.cookie = "token=" + response.data.access_token;
                //document.cookie = "Username=" + emailuser;
                //Return to homepage
                $location.path("/Projects")
            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });

        };

        var populateUsers = function () {

            var ProjectsUrl = "https://localhost:44366/api/projects/users";

            return $http.get(ProjectsUrl)
                .then(function (response) {

                    //$scope.data = response.data;
                    var arrayofdata = [];
                    var dados = response.data;
                    //console.log(dados);


                    for (var i = 0; i < dados.length; i++) {
                        var tempvar = { name: dados[i].userName, value: dados[i].id }
                        arrayofdata.push(tempvar);
                    }

                    //console.log(arrayofdata);

                    $scope.Types = arrayofdata;
                    $scope.error = "";

                })
                .then(function (response) {
                    //$scope.error = "An error occour getting";
                });



        };

        $scope.gottodelete = function (info) {
            $location.path("/Projects/Delete/" + info.id);
        };

        $scope.NewdeleteProj = function () {
            //console.log(info);
            var selectedItem = null;
            var ProjectName = null;
            var Budget = null;

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/projects/delProject',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "UserId": selectedItem,
                    "ProjName": ProjectName,
                    "Budget": Budget,
                    "id": $scope.idifavailabel
                }
            }).then(function (response) {
                //document.cookie = "token=" + response.data.access_token;
                //document.cookie = "Username=" + emailuser;
                //Return to homepage
                $location.path("/Projects")
            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });
        };


        getProjects();
        populateUsers();
        $scope.idifavailabel = $routeParams.ProjectId


    };

    app.controller("ProjectMainController", ProjectMainController);

}());