'use strict';

angular.module('webuiApp')
    .controller('LoginCtrl', function ($scope, $window, localStorageService, loginInformation) {

        $scope.login = function () {
            localStorageService.add('username', $scope.username);
            localStorageService.add('hostname', $scope.hostname);
            loginInformation
            console.log(localStorageService.get('username'));
            console.log(localStorageService.get('password'));
            console.log(localStorageService.get('hostname'));
            $window.location.href= "#main";
        }

    });
