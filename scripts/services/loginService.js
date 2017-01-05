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
        var userName = 'default';
        var userToken = 'defaultToken';
        var openShiftServer = 'https://localhost:8443/';

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

            getOpenShiftServer: function () {
                return openShiftServer;
            },
            setOpenShiftServer: function(value) {
                openShiftServer = value;
            }

        };
    });