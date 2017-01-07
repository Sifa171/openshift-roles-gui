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
        var errorMessage = null;

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

            getErrorMessage: function () {
                return errorMessage;
            },
            setErrorMessage: function(value) {
                errorMessage = value;
            },
            requestToken: function (callbackFunction) {
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/requestToken/',
                    headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
                    data: $.param({
                        username: this.getUserName(),
                        password: this.getPassword(),
                        server: this.getHostname()
                    })
                };
                var self = this;
                $http(req).then(function successCallback(response) {
                    if(response.data.error == true){
                        self.setSuccess(false);
                        self.setErrorMessage(response.data.error_message);
                        callbackFunction();
                    }else{
                        self.setUserToken(response.data.data.userToken);
                        self.setSuccess(true);
                        callbackFunction();
                    }
                }, function errorCallback(response) {
                    self.setSuccess(false);
                    callbackFunction();
                });
            }
        };
    });
