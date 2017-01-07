/**
 * Created by meissner on 06.01.17.
 */
'use strict';

angular.module("watchApiService", [])
    .factory('watchApiService', function (loginInformation) {

        // List of subscriptions per event
        var subscriberList = {};

        var subscribedSockets = {};

        return {
            watchApi: function (apiObject, subscriberName, callbackFunction) {

                // TODO: handle the removal of listeners on controller destruction
                if (subscribedSockets.hasOwnProperty(apiObject)) {
                    // Already subscribted
                    console.log(subscriberList[apiObject]);
                    angular.forEach(subscriberList[apiObject], function(value, key) {
                        console.log(key);
                        if (key == subscriberName) {
                            subscriberList[apiObject][key] = callbackFunction;
                            return;
                        }
                    });
                    subscriberList[apiObject][subscriberName] = callbackFunction;
                } else {
                    // Need to subscribe
                    // TODO: Take own server instead of localhost
                    // TODO: determine the protocol (ws/wss) based on https
                    var ws = new WebSocket('ws://localhost:8080/proxy-api/oapi/v1/' + apiObject + '?watch=true&access_token=' + loginInformation.getUserToken() + '&_server=' + loginInformation.getHostname());

                    subscribedSockets[apiObject] = {};
                    subscribedSockets[apiObject].ws = ws;

                    subscriberList[apiObject] =  {};
                    subscriberList[apiObject][subscriberName] = callbackFunction;

                    ws.onopen = function(){
                        console.log("Socket has been opened!");
                    };

                    var self = this;
                    ws.onmessage = function(message){
                        self.broadcastChange(apiObject, message);


                    };
                }

                // '/oapi/v1/groups?watch=true&access_token=' + loginInformation.getUserToken(), loginInformation.getHostname()

            },

            broadcastChange: function(apiObject, message) {
                angular.forEach(subscriberList[apiObject], function(value, key) {
                    value(apiObject, message);
                });
            }

        };
    });

