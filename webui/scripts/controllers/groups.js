'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService) {

        $scope.init = function() {
            console.log("init GroupsCtrl");
        }

        $scope.init();

    });
