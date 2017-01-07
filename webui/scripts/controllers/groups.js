'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, loginInformation) {

        $scope.groupsWs = null;
        $scope.init = function() {
            console.log("init GroupsCtrl");

            $scope.groupsWs = watchApiService.watchApi('groups');
        };

        $scope.init();

    });
