'use strict';

angular.module('webuiApp')
    .controller('NavigationCtrl', function ($scope, $location, User, hideNavigation) {

        $scope.primaryMenu = [
            {name: 'Home', href: ''}
        ];

        $scope.hideNav = hideNavigation;

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

    });
