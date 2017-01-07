'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, apiObjectHandler) {

        $scope.groups = [];

        $scope.init = function () {
            console.log("init GroupsCtrl");

            // Subscribe for change
            $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function (apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
                $scope.$apply(function () {
                    var dataJson = angular.fromJson(message.data);
                    if (dataJson.type == 'ADDED') {
                        //$scope.groups.push(message.object);
                        console.log(dataJson.obkect);
                        console.log({metadata:{name: 'dreck'}});
                        $scope.groups.push(dataJson.object);
                    }
                });
            });

        };

        $scope.init();

        $scope.$on("$destroy", function handler() {
            // remove from handler
            console.log('--------');
            watchApiService.removeWatch('GroupsCtrl');
        });

    });
