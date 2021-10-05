(function () {

    var app = angular.module("UserApp");

    var TaskMainController = function ($scope, $http, $location, $routeParams) {

        $scope.error = "Loading";

        var getProjects = function () {

            var ProjectsUrl = "https://localhost:44366/api/tasks/tasks";

            return $http.get(ProjectsUrl)
                .then(function (response) {
                    $scope.data = response.data;
                    //console.log(response.data);
                })
                .then(function (response) {
                    //$scope.error = "An error occour getting";
                });

        };


        $scope.CreateTask = function (selectedItem, selectedProject, TaskName, Dateo) {

            var dateOut = new Date(Dateo);

            // allows selection of first object
            if (selectedProject == undefined) {
                selectedProject = $scope.TypesProject[0].value;
            };
            if (selectedItem == undefined) {
                selectedProject = $scope.Types[0].value;
            };

            // calls function to put value
            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/createTask',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "UserId": selectedItem,
                    "ProjectId": selectedProject,
                    "TaskName": TaskName,
                    "DataLimite": dateOut
                }
            }).then(function (response) {
                //document.cookie = "token=" + response.data.access_token;
                //document.cookie = "Username=" + emailuser;
                //Return to homepage
                $location.path("/Tasks")
            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });

        };

        var populateUsers = function () {

            var ProjectsUrl = "https://localhost:44366/api/tasks/users";

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

        var populateProjects = function () {

            var ProjectsUrl = "https://localhost:44366/api/projects/projects";

            return $http.get(ProjectsUrl)
                .then(function (response) {

                    //console.log(response.data);

                    //$scope.data = response.data;
                    var arrayofdata = [];
                    var dados = response.data;
                    //console.log(dados);


                    for (var i = 0; i < dados.length; i++) {
                        var tempvar = { name: dados[i].projName, value: dados[i].id }
                        arrayofdata.push(tempvar);
                    }

                    //console.log(arrayofdata);

                    $scope.TypesProject = arrayofdata;
                    $scope.error = "";

                })
                .then(function (response) {
                    //$scope.error = "An error occour getting";
                });
        };

        $scope.gottodelete = function (info) {
            $location.path("/Tasks/Delete/" + info.id);
        };

        $scope.gottomark = function (info) {
            $location.path("/Tasks/Mark/" + info.id);
        };

        $scope.deleteProj = function () {
            //console.log(info);

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/deleteTasks',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "UserId": null,
                    "ProjectId": null,
                    "TaskName": null,
                    "DataLimite": null,
                    "id": $scope.idifavailabel
                }
            }).then(function (response) {
                //document.cookie = "token=" + response.data.access_token;
                //document.cookie = "Username=" + emailuser;
                //Return to homepage
                $location.path("/Tasks")
            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });
        };

        $scope.updatetask = function () {
            //console.log(info);

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/markTasks',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "UserId": null,
                    "ProjectId": null,
                    "TaskName": null,
                    "DataLimite": null,
                    "id": $scope.idifavailabel
                }
            }).then(function (response) {
                //document.cookie = "token=" + response.data.access_token;
                //document.cookie = "Username=" + emailuser;
                //Return to homepage
                $location.path("/Tasks")
            }, function (response) {
                $scope.errormsg = "Wrong Password/User";
            });
        };


        getProjects();
        populateUsers();
        populateProjects();
        $scope.idifavailabel = $routeParams.TaskId


    };

    app.controller("TaskMainController", TaskMainController);


}());