'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, loginInformation) {

        $scope.groupsWs = null;
        $scope.init = function() {
            console.log("init GroupsCtrl");

            $scope.groupsWs = watchApiService.watchApi('/oapi/v1/projects?watch=true&access_token=' + loginInformation.getUserToken(), loginInformation.getHostname());
        };

        $scope.init();

    });
