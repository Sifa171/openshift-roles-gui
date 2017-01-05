'use strict';

angular.module('webuiApp')
    .controller('NavigationCtrl', function ($scope, $location, User, hideNavigation, loginInformation, $window) {

        $scope.primaryMenu = [
            {name: 'Home', href: ''}
        ];

        $scope.hideNav = hideNavigation;
        $scope.loginInfo = loginInformation;

        $scope.userInfo = {userName: 'unknown'};

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path() ? "active" : "";
        };

        $scope.getUserInfo = function () {
            User.userInfo()
                .success(function (data) {
                    $scope.userInfo.userName = data.data.user.userName;
                });
        };
        $scope.getUserInfo();

        $scope.logout = function () {
            hideNavigation.setHide(true);
            $window.location.href= ".";
        }

    });
