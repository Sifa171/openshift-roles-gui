'use strict';

angular.module('webuiApp')
    .controller('LoginCtrl', function ($scope, $window) {

        $scope.login = function () {
            $window.location.href= "#main";
        }

    });
