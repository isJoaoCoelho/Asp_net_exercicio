(function () {

    var app = angular.module("UserApp");

    var TaskMainController = function ($scope, $http, $location, $routeParams) {

        $scope.error = "Loading";

        var getProjects = function () {

            var ProjectsUrl = "https://localhost:44366/api/tasks/tasks";
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            return $http({
                method: 'GET',
                url: ProjectsUrl,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                $scope.data = response.data;
            }, function (response) {
                $location.path("/login")
            });


        };


        $scope.CreateTask = function (selectedItem, selectedProject, TaskName, Dateo) {

            var dateOut = new Date(Dateo);
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            // allows selection of first object
            if ($scope.TypesProject.length != 0) {
                if (selectedProject == undefined) {
                    selectedProject = $scope.TypesProject[0].value;
                };
                if (selectedItem == undefined) {
                    selectedProject = $scope.Types[0].value;
                };
            };

            // calls function to put value
            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/createTask',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
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
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            return $http({
                method: 'GET',
                url: ProjectsUrl,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                var arrayofdata = [];
                var dados = response.data;

                for (var i = 0; i < dados.length; i++) {
                    var tempvar = { name: dados[i].userName, value: dados[i].id }
                    arrayofdata.push(tempvar);
                }

                $scope.Types = arrayofdata;
                $scope.error = "";
            }, function (response) {
                //$scope.error = "An error occour getting";
            });

            //return $http.get(ProjectsUrl)
            //    .then(function (response) {

            //        //$scope.data = response.data;
            //        var arrayofdata = [];
            //        var dados = response.data;
            //        //console.log(dados);


            //        for (var i = 0; i < dados.length; i++) {
            //            var tempvar = { name: dados[i].userName, value: dados[i].id }
            //            arrayofdata.push(tempvar);
            //        }

            //        //console.log(arrayofdata);

            //        $scope.Types = arrayofdata;
            //        $scope.error = "";

            //    })
            //    .then(function (response) {
            //        //$scope.error = "An error occour getting";
            //    });
        };

        var populateProjects = function () {

            var ProjectsUrl = "https://localhost:44366/api/projects/projects";
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            return $http({
                method: 'GET',
                url: ProjectsUrl,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                var arrayofdata = [];
                var dados = response.data;

                for (var i = 0; i < dados.length; i++) {
                    var tempvar = { name: dados[i].projName, value: dados[i].id }
                    arrayofdata.push(tempvar);
                }

                $scope.TypesProject = arrayofdata;
                $scope.error = "";
            }, function (response) {
                //$scope.error = "An error occour getting";
            });

            //return $http.get(ProjectsUrl)
            //    .then(function (response) {

            //        //console.log(response.data);

            //        //$scope.data = response.data;
            //        var arrayofdata = [];
            //        var dados = response.data;
            //        //console.log(dados);


            //        for (var i = 0; i < dados.length; i++) {
            //            var tempvar = { name: dados[i].projName, value: dados[i].id }
            //            arrayofdata.push(tempvar);
            //        }

            //        //console.log(arrayofdata);

            //        $scope.TypesProject = arrayofdata;
            //        $scope.error = "";

            //    })
            //    .then(function (response) {
            //        //$scope.error = "An error occour getting";
            //    });
        };

        $scope.gottodelete = function (info) {
            $location.path("/Tasks/Delete/" + info.id);
        };

        $scope.gottomark = function (info) {
            $location.path("/Tasks/Mark/" + info.id);
        };

        $scope.deleteProj = function () {
            //console.log(info);
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/deleteTasks',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
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
            var token = CookieParser("token");
            if (token == null) { $scope.errormsg = "Unable to get user token"; }

            $http({
                method: 'POST',
                url: 'https://localhost:44366/api/tasks/markTasks',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
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

        var CookieParser = function (cookievalue) {
            let cookies = document.cookie;
            var arraycookies = cookies.split(';');
            for (var i = 0; i < arraycookies.length; i++) {
                if (arraycookies[i].includes(cookievalue)) {
                    var info = arraycookies[i].split('=')[1];
                    return info;
                }
            }
            return null;
        };

        getProjects();
        populateUsers();
        populateProjects();
        $scope.idifavailabel = $routeParams.TaskId


    };

    app.controller("TaskMainController", TaskMainController);


}());