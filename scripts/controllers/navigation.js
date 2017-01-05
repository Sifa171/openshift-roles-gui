'use strict';

angular.module('webuiApp')
    .controller('NavigationCtrl', function ($scope, $location, hideNavigation, loginInformation, $window, localStorageService) {

        $scope.primaryMenu = [
            {name: 'Home', href: ''}
        ];

        $scope.hideNav = hideNavigation;
        $scope.loginInfo = loginInformation;
        $scope.hostname = localStorageService.get('hostname');

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path() ? "active" : "";
        };

        $scope.logout = function () {
            hideNavigation.setHide(true);
            $window.location.href= ".";
        }

    });
