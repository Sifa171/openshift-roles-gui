'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation) {

        $scope.start = function () {
            console.log("blaah");
            hideNavigation.setHide(false);
        }
    });
