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
            $scope.userCount = 0;
            watchApiService.watchApi(object, 'MainCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
                $scope.$apply(function(){
                    var dataJson = angular.fromJson(message.data);
                    if(dataJson.type == 'ADDED'){
                        $scope.userCount = $scope.userCount +1;
                    }
                });
            });
        };

        function countRoles(){
            var object = 'roles';
            $scope.roleCount= 0;
            watchApiService.watchApi(object, 'MainCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
                $scope.$apply(function(){
                    var dataJson = angular.fromJson(message.data);
                    if(dataJson.type == 'ADDED'){
                        $scope.roleCount = $scope.roleCount +1;
                    }
                });
            });
        };

        function countPolicyBindings(){
            var object = 'policybindings';
            $scope.policybindingCount= 0;
            watchApiService.watchApi(object, 'MainCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
                $scope.$apply(function(){
                    var dataJson = angular.fromJson(message.data);
                    if(dataJson.type == 'ADDED'){
                        $scope.policybindingCount = $scope.policybindingCount +1;
                    }
                });
            });
        };

        function countGroups() {
            var object = 'groups';
            $scope.groupCount = 0;
            watchApiService.watchApi(object, 'MainCtrl', function(apiObject, message) {
                // Callback if something changes
                console.log('Got a change for ' + apiObject);
                console.log(message);
                $scope.$apply(function(){
                    var dataJson = angular.fromJson(message.data);
                    if(dataJson.type == 'ADDED'){
                        $scope.groupCount = $scope.groupCount +1;
                    }
                });
            });

        };
    });
