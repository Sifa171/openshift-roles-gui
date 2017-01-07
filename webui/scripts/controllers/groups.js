'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, loginInformation) {

        $scope.groupsWs = null;
        $scope.init = function() {
            console.log("init GroupsCtrl");

            $scope.groupsWs = watchApiService.watchApi('groups', function() {
                // Callback if something changes
                console.log('watched groups');
            });
        };

        $scope.init();

    });
