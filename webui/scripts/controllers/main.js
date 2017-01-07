'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation, apiObjectHandler, watchApiService) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if (!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()) {
                $scope.notloggedIn = true;
            }
            countGroups();
            countUser();
            countPolicyBindings();
            countRoles();
        };

        function countUser(){
            var object = 'users';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var users = response.data.items;
                    $scope.userCount = users.length;
                } else {
                    console.log('error');
                    console.log(response);
                }
            });

        };

        function countRoles(){
            var object = 'roles';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var roles = response.data.items;
                    $scope.roleCount = roles.length;
                } else {
                    console.log('error');
                    console.log(response);
                }
            });

        };

        function countPolicyBindings(){
            var object = 'policybindings';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var policybindings = response.data.items;
                    $scope.policybindingCount = policybindings.length;
                } else {
                    console.log('error');
                    console.log(response);
                }
            });

        };

        function countGroups() {
            var object = 'groups';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var groups = response.data.items;
                    $scope.groupCount = groups.length;
                    watchApiService.watchApi('groups', 'MainCtrl', function(apiObject, message) {
                        // Callback if something changes
                        console.log('Got a change for ' + apiObject);
                        console.log(message);
                    });
                } else {
                    console.log('error');
                    console.log(response);
                }
            });

        };
    });
