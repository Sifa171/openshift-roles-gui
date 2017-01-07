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

                    // Subscribe for change
                    $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function(apiObject, message) {
                        // Callback if something changes
                        var messageData = angular.fromJson(message.data);
                        // scope[scopedVariable].push(messageData.object);
                        switch (messageData.type) {
                            case 'ADDED':
                                console.log('Adding to list');
                                scope.groups.push(messageData.object);

                                break;
                            default:
                                console.log('Unknown messageData.type = ' + messageData.type);
                        }
                    });
                } else {
                    // TODO: do additional error handling
                    console.log('error');
                }

            });


        };

        $scope.init();

    });
