'use strict';

angular.module('webuiApp')
    .controller('LoginCtrl', function ($scope, $window, localStorageService, loginInformation, hideNavigation) {

        // Hide Navigation when login controller is loaded
        hideNavigation.setHide(true);

        $scope.login = function () {
            // set the credentials inside of the service
            loginInformation.setHostname($scope.hostname);
            loginInformation.setUserName($scope.username);
            loginInformation.setPassword($scope.password);

            // make the request
            loginInformation.requestToken(function() {
			if(loginInformation.getSuccess() == true){
                localStorageService.add('username', $scope.username);
                localStorageService.add('hostname', $scope.hostname);
                localStorageService.add('userToken', loginInformation.getUserToken());
                $window.location.href= "#main";
            }else{
                console.log("error");
            }
            });
            

        }

    });
