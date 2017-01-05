'use strict';

angular.module('webuiApp')
    .controller('NavigationCtrl', function ($scope, $location, hideNavigation, loginInformation, $window, localStorageService) {

        $scope.primaryMenu = [
            {name: 'Home', href: ''}
        ];

        $scope.hideNav = hideNavigation;
        $scope.loginInfo = loginInformation;

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path() ? "active" : "";
        };

        $scope.logout = function () {
            localStorageService.clearAll();
            loginInformation.setHostname(null);
            loginInformation.setUserName(null);
            loginInformation.setUserToken(null);
            hideNavigation.setHide(true);
            $window.location.href= ".";
        }

    });
