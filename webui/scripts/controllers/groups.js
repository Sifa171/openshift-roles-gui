'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, loginInformation) {

        $scope.groupsWs = null;
        $scope.init = function() {
            console.log("init GroupsCtrl");

            $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('watched ' + apiObject);
                console.log(message);
            });
        };

        $scope.init();

    });
