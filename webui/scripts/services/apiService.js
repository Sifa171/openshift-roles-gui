/**
 * Created by sifa on 07.01.17.
 */
'use strict';

angular.module("apiService", [])
    .factory('apiObjectHandler', function (loginInformation, $http) {

        var success = null;
        var response = null;
        var errorMessage = null;

        return{
            getSuccess: function () {
                return success;
            },
            setSuccess: function(value) {
                success = value;
            },
            getResponse: function () {
                return response;
            },
            setResponse: function(value) {
                response = value;
            },
            getErrorMessage: function () {
                return errorMessage;
            },
            setErrorMessage: function(value) {
                errorMessage = value;
            },
            requestObject : function (apiObject, callbackFunction) {
                var apiUrl = 'http://localhost:8080/api-proxy/oapi/v1/' + apiObject + '?_server=' + loginInformation.getHostname();
                var req = {
                    method: 'GET',
                    url: apiUrl,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + loginInformation.getUserToken()
                    }
                };
                var self = this;
                $http(req).then(function successCallback(response) {
                    console.log(response);
                    if(response.data.error == true){
                        self.setSuccess(false);
                        self.setErrorMessage(response.data.error_message);
                        callbackFunction();
                    }else{
                        self.setSuccess(true);
                        self.setResponse(response);
                        callbackFunction();
                    }
                }, function errorCallback(response) {
                    self.setSuccess(false);
                    callbackFunction();
                });
            }
        }
    })


