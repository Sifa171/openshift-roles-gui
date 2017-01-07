'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if(!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()){
                $scope.notloggedIn = true;
            }
        }
    });
