'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation) {

        $scope.start = function () {
            hideNavigation.setHide(false);
        }
    });
