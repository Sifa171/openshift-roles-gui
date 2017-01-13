'use strict';

angular.module('webuiApp')
    .controller('MainCtrl', function ($scope, hideNavigation, loginInformation, apiObjectHandler) {
        $scope.start = function () {
            hideNavigation.setHide(false);
            if (!loginInformation.getUserName() && !loginInformation.getUserToken() && !loginInformation.getUserToken()) {
                $scope.notloggedIn = true;
            }
            countRoles();
            countGroups();
            countUser();
            countPolicyBindings();
            countVerbs();

        };

        $scope.refresh = function () {
            countRoles();
            countGroups();
            countUser();
            countPolicyBindings();
            countVerbs();
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

        function countRoles(){
            var object = 'clusterroles';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var roles = response.data.items;
                    if(roles.length == 0){
                        $scope.roleCount = 0;
                    }else{
                        $scope.roleCount = roles.length;
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

        function countVerbs() {
            var object = 'clusterpolicybindings';
            apiObjectHandler.requestObject(object, function (success, response) {
                if (success) {
                    var verbs = response.data.items;
                    if(verbs.length == 0){
                        $scope.verbCount = 0;
                    }else{
                        $scope.verbCount = verbs.length;
                    }
                } else {
                    console.log('error');
                    console.log(response);
                }
            });
        };
    });
