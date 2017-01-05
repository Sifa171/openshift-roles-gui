'use strict';

angular.module('userService', [])
    .factory('User', function ($http) {

        return {
            // get all the comments
            userInfo: function () {
                return $http.get('/backend/user/');
            }

        }
    });
