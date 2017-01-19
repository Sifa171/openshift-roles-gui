'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation, apiObjectHandler) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if (!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()) {
                $scope.notloggedIn = true;
            }
            countGroups();
            countUser();
            countPolicyBindings();
            countClusterPolicybindings();
            countClusterRoles();

        };

        $scope.refresh = function () {
            countGroups();
            countUser();
            countPolicyBindings();
            countClusterPolicybindings();
            countClusterRoles();
            // TODO: REfresh Scope
        };

        function countUser(){
            var object = 'users';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var users = response.data.items;
                    if(users.length == 0){
                        $scope.userCount = 0;
                    }else{
                        $scope.userCount = users.length;
                    }
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
                    if(policybindings.length == 0){
                        $scope.policybindingCount = 0;
                    }else{
                        $scope.policybindingCount = policybindings.length;
                    }
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
                    if(groups.length == 0){
                        $scope.groupCount = 0;
                    }else{
                        $scope.groupCount = groups.length;
                    }
                } else {
                    console.log('error');
                    console.log(response);
                }
            });
        };

        function countClusterPolicybindings() {
            var object = 'clusterpolicybindings';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var clusterpolicybindings = response.data.items[0].roleBindings;
                    if(clusterpolicybindings.length == 0){
                        $scope.clusterpolicybindingsCount = 0;
                    }else{
                        $scope.clusterpolicybindingsCount = clusterpolicybindings.length;
                    }
                } else {
                    console.log('error');
                    console.log(response);
                }
            });
        };

        function countClusterRoles() {
            var object = 'clusterroles';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var clusterroles = response.data.items;
                    if(clusterroles.length == 0){
                        $scope.clusterRoleCount = 0;
                    }else{
                        $scope.clusterRoleCount = clusterroles.length;
                    }
                } else {
                    console.log('error');
                    console.log(response);
                }
            });
        };
    });
