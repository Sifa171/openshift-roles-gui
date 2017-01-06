'use strict';

angular.module('webuiApp')
    .controller('LoginCtrl', function ($scope, $window, localStorageService, loginInformation, hideNavigation) {

        // Hide Navigation when login controller is loaded
        hideNavigation.setHide(true);

        $scope.initLoginCredentials = function () {
            if(localStorageService.get('remember') == true){
                $scope.remember = localStorageService.get('remember');
                $scope.username = localStorageService.get('username');
                $scope.hostname = localStorageService.get('hostname');
            }
        }

        $scope.login = function () {
            // set the credentials inside of the service
            loginInformation.setHostname($scope.hostname);
            loginInformation.setUserName($scope.username);
            loginInformation.setPassword($scope.password);

            // set remember credentials true, before making the request
            localStorageService.add('remember', $scope.remember);
            localStorageService.add('username', $scope.username);
            localStorageService.add('hostname', $scope.hostname);

            // make the request
            loginInformation.requestToken(function() {
                // TODO: Spinning Modal
			if(loginInformation.getSuccess() == true){
                localStorageService.add('userToken', loginInformation.getUserToken());
                $window.location.href= "#main";
            }else{
                // TODO: error with Dialog
            }
            });
            

        }

    });
