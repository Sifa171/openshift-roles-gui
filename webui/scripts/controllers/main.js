'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation, apiObjectHandler) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if(!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()){
                $scope.notloggedIn = true;
            }
            countGroups();

        }

        function countGroups() {
            var object = 'groups';
            apiObjectHandler.requestObject(object);
            var response = apiObjectHandler.getResponse();
            var groups = response.data.items;
            console.log(groups);
        }
    });
