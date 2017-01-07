/**
 * Created by sifa on 07.01.17.
 */
'use strict';

angular.module("apiService", [])
    .factory('apiObjectHandler', function (loginInformation, $http) {

        return{

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
                    callbackFunction(true, response);
                }, function errorCallback(response) {
                    callbackFunction(false, response);
                });
            }
        }
    })


