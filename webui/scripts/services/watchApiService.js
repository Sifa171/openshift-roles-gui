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
            watchApi: function (apiObject, subscriberName, callbackFunction, resourceVersion) {

                // TODO: handle the removal of listeners on controller destruction
                if (subscribedSockets.hasOwnProperty(apiObject)) {
                    // Already subscribted
                    console.log('Already subscribted');
                    console.log(subscriberList[apiObject]);
                    angular.forEach(subscriberList[apiObject], function (value, key) {
                        console.log(key);
                        if (key == subscriberName) {
                            subscriberList[apiObject][key] = callbackFunction;
                            return;
                        }
                    });
                    subscriberList[apiObject][subscriberName] = callbackFunction;

                    console.log("dreck "+apiObject+'_'+subscriberName);
                } else {
                    // Need to subscribe
                    // TODO: Take own server instead of localhost
                    // TODO: determine the protocol (ws/wss) based on https
                    console.log('need to subscribe');

                    var connectionUrl = 'ws://localhost:8080/proxy-web/oapi/v1/' + apiObject + '?watch=true&access_token=' + loginInformation.getUserToken() + '&_server=' + loginInformation.getHostname();
                    if (resourceVersion && resourceVersion > 0) {
                        connectionUrl += '&resourceVersion=' + resourceVersion;
                    }
                   var ws = new WebSocket(connectionUrl);
                   // var ws = new WebSocket('wss://192.168.1.20:8443/oapi/v1/' + apiObject + '?watch=true&access_token=' + loginInformation.getUserToken() + '&_server=' + loginInformation.getHostname());

                    subscribedSockets[apiObject] = {};
                    subscribedSockets[apiObject].ws = ws;

                    subscriberList[apiObject] = {};
                    subscriberList[apiObject][subscriberName] = callbackFunction;

                    //console.log("dreck "+apiObject+'_'+subscriberName);


                    ws.onopen = function () {
                        console.log("Socket has been opened!");
                    };

                    var self = this;
                    ws.onmessage = function (message) {
                        self.broadcastChange(apiObject, message);
                    };

                    ws.onerror = function(error) {
                        console.log('error');
                        console.log(error);
                    };
                }

                // '/oapi/v1/groups?watch=true&access_token=' + loginInformation.getUserToken(), loginInformation.getHostname()

            },

            removeWatch: function (apiObject, subscriberName) {
                console.log("--- remove watch"+apiObject+'_'+subscriberName);
                console.log(subscriberList[apiObject]);
                delete subscriberList[apiObject][subscriberName];
                console.log(subscriberList[apiObject]);
                console.log('-----');

                if (subscriberList[apiObject].length < 1) {
                    console.log('close websocket');
                    subscribedSockets[apiObject].close();
                    delete subscribedSockets[apiObject];
                }
            },

            broadcastChange: function (apiObject, message) {
                angular.forEach(subscriberList[apiObject], function (value, key) {
                    value(apiObject, message);
                });
            }

        };
    });

