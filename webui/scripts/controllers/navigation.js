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

        $scope.init = function() {
            if ($location.path() && $location.path() != '/') {
              $scope.hideNav = false;
            }
        };
        $scope.init();

        $scope.loadLoginInformationFromLocalStorage = function () {
            loginInformation.setHostname(localStorageService.get('hostname'));
            loginInformation.setUserName(localStorageService.get('username'));
            loginInformation.setUserToken(localStorageService.get('usertoken'));
        };

        $scope.logout = function () {
            localStorageService.clearAll();
            loginInformation.setHostname(null);
            loginInformation.setUserName(null);
            loginInformation.setUserToken(null);
            hideNavigation.setHide(true);
            $window.location.href= ".";
        };

        // Load data from localStorage
        $scope.loadLoginInformationFromLocalStorage();

    });
