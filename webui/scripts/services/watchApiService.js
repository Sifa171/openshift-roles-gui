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
            watchApi: function (apiObject, callbackFunction) {
                console.log('sdf' + loginInformation.getHostname());

                // TODO: handle the removal of listeners on controller destruction

                if (subscribedSockets.hasOwnProperty(apiObject)) {
                    // Already subscribted
                    console.log('already subscribed');
                    subscriberList[apiObject].push(callbackFunction);
                } else {
                    // Need to subscribe
                    // TODO: Take own server instead of localhost
                    // TODO: determine the protocol (ws/wss) based on https
                    var ws = new WebSocket('ws://localhost:8080/proxy-api/oapi/v1/' + apiObject + '?watch=true&access_token=' + loginInformation.getUserToken() + '&_server=' + loginInformation.getHostname());

                    subscribedSockets[apiObject] = {};
                    subscribedSockets[apiObject].ws = ws;

                    subscriberList[apiObject] = [];
                    subscriberList[apiObject].push(callbackFunction);

                    ws.onopen = function(){
                        console.log("Socket has been opened!");
                    };

                    var self = this;
                    ws.onmessage = function(message){
                        self.broadcastChange(self, apiObject, message);


                    };
                }

                // '/oapi/v1/groups?watch=true&access_token=' + loginInformation.getUserToken(), loginInformation.getHostname()

            },

            broadcastChange: function(self, apiObject, message) {
                console.log('broadcast ' + message);

                angular.forEach(self.subscribedSockets, function(value, key) {
                    value();
                });
            },

            watchApiOld: function (path, server) {
                console.log(path + ' - ' + server);
                // Based on http://clintberry.com/2013/angular-js-websocket-service/

                // We return this object to anything injecting our service
                var Service = {};
                // Keep all pending requests here until they get responses
                var callbacks = {};
                // Create a unique callback ID to map requests to responses
                var currentCallbackId = 0;
                // Create our websocket object with the address to the websocket
                // TODO: Take own server instead of localhost
                // TODO: determine the protocol (ws/wss) based on https
                var ws = new WebSocket("ws://localhost:8080/proxy-api" + path + '&_server=' + server);

                //var ws = new WebSocket('wss://192.168.1.20:8443/oapi/v1/projects?watch=true&access_token=ztY-JffxkXwnfO2Y_u-un2IycLAVoY_G-NSNlDReK5o');
                ws.onopen = function(){
                    console.log("Socket has been opened!");
                };

                ws.onmessage = function(message) {
                    console.log("Got message");
                    console.log(message);
                };

                return ws;

            }

        };
    });

