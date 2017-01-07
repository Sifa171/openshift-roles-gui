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
            var tokenExpiration = localStorageService.get('tokenExpiration');
            if(tokenExpiration != null && (tokenExpiration < Date.now() + 24 * 60 * 60 * 1000)){
                setLoginInformationFromLocalStorage();
                console.log(loginInformation.getUserToken());
                console.log(loginInformation.getUserName());
                console.log(loginInformation.getHostname());
            }else{
                if (!loginInformation.getUserName() || !loginInformation.getUserToken()) {
                    $window.location.href= "#login";
                } else if ($location.path() && $location.path() != '/') {
                    $scope.hideNav = false;
                }
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
            $window.location.href= ".";
        };

        // Load data from localStorage
        $scope.loadLoginInformationFromLocalStorage();

    });
