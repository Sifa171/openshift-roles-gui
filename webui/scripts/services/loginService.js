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
    .factory('loginInformation', function ($http) {
        var userName = null;
        var userToken = null;
        var hostname = null;
        var success = null;
        var password = null;

        return {
            getPassword: function () {
                return password;
            },
            setPassword: function(value) {
                password = value;
            },
            getSuccess: function () {
                return success;
            },
            setSuccess: function(value) {
                success = value;
            },
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
            },
            requestToken: function () {
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/requestToken/',
                    form: {
                        username: this.getUserName(),
                        password: this.getPassword(),
                        server: this.getHostname()
                    }
                }
                $http(req).then(function successCallback(response) {
                    console.log("Bklaaaaah");
                    console.log(response);
                    this.setSuccess(true);
                }, function errorCallback(response) {
                    this.setSuccess(false);
                });
            }
        };
    });