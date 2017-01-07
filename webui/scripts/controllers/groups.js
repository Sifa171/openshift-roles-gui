'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService) {

        $scope.groupsWs = null;
        $scope.init = function() {
            console.log("init GroupsCtrl");

            $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
            });
        };

        $scope.init();

    });
