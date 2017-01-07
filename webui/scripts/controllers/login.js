'use strict';

angular.module('webuiApp')
    .controller('LoginCtrl', function ($scope, $window, localStorageService, loginInformation, hideNavigation) {

        // Hide Navigation when login controller is loaded
        hideNavigation.setHide(true);

        $scope.initLoginCredentials = function (){
            if(localStorageService.get('remember') == true){
                $scope.remember = localStorageService.get('remember');
                $scope.username = localStorageService.get('username');
                $scope.hostname = localStorageService.get('hostname');
            }
        }
        
        $scope.cleanErrorMessage = function () {
            loginInformation.setErrorMessage(null);
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
			if(loginInformation.getSuccess() == true){
                var timeExpiration = Date.now() + 24 * 60 * 60 * 1000;
                localStorageService.add('userToken', loginInformation.getUserToken());
                localStorageService.add('tokenExpiration', timeExpiration);
                console.log(localStorageService.get('tokenExpiration'));
                $window.location.href= "#main";
            }else{
                $scope.errorMessage = loginInformation.getErrorMessage();
                $scope.password = '';
            }
            });
            

        }

    });
