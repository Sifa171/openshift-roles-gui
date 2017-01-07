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

        $scope.init = function () {
            var tokenExpiration = localStorageService.get('tokenExpiration');

            if (tokenExpiration != null && (tokenExpiration > Date.now())) {
                setLoginInformationFromLocalStorage();
                console.log(loginInformation.getUserToken());
                console.log(loginInformation.getUserName());
                console.log(loginInformation.getHostname());

                console.log("from local storage: " + $location.path());

                if ($location.path() && $location.path() != '/') {
                    $scope.hideNav = false;
                } else if (!$location.path() || $location.path() == '/login') {
                    $window.location.href = "#/main";
                }

            } else {
                console.log("token expired, please login again");

                localStorageService.clearAll();
                $window.location.href = "#/login";

            }


        };
        $scope.init();

        $scope.loadLoginInformationFromLocalStorage = function () {
            setLoginInformationFromLocalStorage();
        };

        function setLoginInformationFromLocalStorage() {
            loginInformation.setHostname(localStorageService.get('hostname'));
            loginInformation.setUserName(localStorageService.get('username'));
            loginInformation.setUserToken(localStorageService.get('userToken'));
        }

        $scope.logout = function () {
            localStorageService.clearAll();
            loginInformation.setHostname(null);
            loginInformation.setUserName(null);
            loginInformation.setUserToken(null);
            hideNavigation.setHide(true);
            $window.location.href = ".";
        };

        // Load data from localStorage
        $scope.loadLoginInformationFromLocalStorage();

    });
