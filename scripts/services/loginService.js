'use strict';

angular.module("loginService", [])
    .factory('hideNavigation', function () {
        var hide = true;

        return {
            getHide: function () {
                return hide;
            },
            setHide: function(value) {
                hide = value;
            }

        };
    })
    .factory('loginInformation', function () {
        var userName = null;
        var userToken = null;
        var hostname = null;

        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function(value) {
                userName = value;
            },

            getUserToken: function () {
                return userToken;
            },
            setUserToken: function(value) {
                userToken = value;
            },

            getHostname: function () {
                return hostname;
            },
            setHostname: function(value) {
                hostname = value;
            }
        };
    });