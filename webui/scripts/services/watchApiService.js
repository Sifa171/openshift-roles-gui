/**
 * Created by meissner on 06.01.17.
 */
'use strict';

angular.module("watchApiService", [])
    .factory('watchApiService', function () {


        return {
            watchApi: function (path, server) {
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
                var ws = new WebSocket("ws://localhost:8080/proxy-api" + path + '&_server=' + server);

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

