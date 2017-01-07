'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation, apiObjectHandler) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if (!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()) {
                $scope.notloggedIn = true;
            }
            countGroups();

        }

        function countGroups() {
            var object = 'groups';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var groups = response.data.items;
                    $scope.groupCount = groups.length;
                    console.log(groups);
                } else {
                    console.log('error');
                    console.log(response);
                }
            });

        }
    });
