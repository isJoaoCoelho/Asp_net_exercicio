(function() {

    var app = angular.module("UserApp");

    var MainController = function($scope, $interval, $location) {

        $scope.username = "";

        var decrementCountdown = function(){
            $scope.countdown -= 1;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountdown = function(){
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function(username) {
            if(countdownInterval)    {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
        };

        var checklogin = function () {
            let cookies = document.cookie;
            var arraycookies = cookies.split(';');
            for (var i = 0; i < arraycookies.length; i++) {
                if (arraycookies[i].includes("Username")) {
                    $scope.username = "Loged in to user: " + arraycookies[i].split('=')[1];
                    $scope.autenticated = true;
                    return;
                }
            }
            $scope.username = "Anonymous user, please login";
        };


        checklogin();
        $scope.countdown = 5;
        //startCountdown();
    };

    app.controller("MainController", MainController);

}());
