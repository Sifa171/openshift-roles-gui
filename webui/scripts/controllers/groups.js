'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, apiObjectHandler) {

        $scope.groups = [];
        $scope.init = function() {
            console.log("init GroupsCtrl");

            // Load the groups
            var scope = $scope;
            apiObjectHandler.requestObject('groups', function(success, response) {
                if (success) {
                    scope.groups = response.data.items;
                    console.log(scope.groups);
                } else {
                    // TODO: do additional error handling
                    console.log('error');
                }

            });

            // Subscribe for change
            $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
            });
        };

        $scope.init();

    });
