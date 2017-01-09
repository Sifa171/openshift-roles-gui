'use strict';

angular.module('webuiApp')
    .controller('GroupsCtrl', function ($scope, watchApiService, apiObjectHandler, apiCurator) {

        $scope.groups = [];

        $scope.init = function () {
            console.log("init GroupsCtrl");
           // $scope.$apply(function () {
            apiCurator.requestData('groups', function() {
                $scope.groups = apiCurator.getData('groups');
            }, true);

            console.log($scope.groups);
           // });
            //apiCurator.init();
            //$scope.groups = apiCurator.getGroups();
            //console.log(apiCurator.getGroups());
            // Subscribe for change
      /*      $scope.groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function (apiObject, message) {
                // Callback if something changes
                $scope.$apply(function () {
                    var dataJson = angular.fromJson(message.data);
                    if (dataJson.type == 'ADDED') {
                        $scope.groups.push(dataJson.object);
                    }
                });
            });*/

        };

        $scope.init();

        $scope.$on("$destroy", function handler() {
            // remove from handler
            console.log('-------- destruction');
            watchApiService.removeWatch('groups', 'GroupsCtrl');
        });

    });
