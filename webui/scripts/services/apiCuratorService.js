/**
 * Service to curate data from the api
 * These service can get initial data for an apiObject
 * If you subscribe to an apiObject the curator will monitor changes and inform you if they occur
 * Based on the last resourceVersion the curator only gathers changes over the websocket
 *
 * Created by meissner on 07.01.17.
 */

angular.module("apiCuratorService", [])
    .factory('apiCurator', function (loginInformation, $http, $rootScope, watchApiService, apiObjectHandler) {

        // List with all collected data
        // index is the apiObject
        // The value contains
        //  lastResourceVersion resourceVersion of the last received data
        //  data                array with the data
        //  subscribed          true if the curator is subscribed to the data
        var dataCollection = {};

        return {

            getData: function(apiObject) {
                if (!dataCollection.hasOwnProperty(apiObject)) {
                    return [];
                } else {
                    return dataCollection[apiObject].data;
                }
            },

            /**
             * Requests the data of apiObject
             * If data from a given apiObject is already subscribed, a requestData call only returns the current version of data without requesting it
             * if onlyInitial=true the data doesn't have to be the latest, because it is afterwards watched
             *
             * After requesting data you can either  bind it directly to the ui or give a callback
             *
             * @param apiObject
             * @param callback
             * @param onlyInitial only for initial data (optional)
             */
            requestData: function(apiObject, callback, onlyInitial) {
                // Check if data are already requested
                if (dataCollection.hasOwnProperty(apiObject) && (onlyInitial || dataCollection[apiObject].subscribed)) {
                    // Just return the data
                    console.log('apiCurator: returning cached data');

                    // Execute the callback anyway
                    if (callback) {
                        callback(true, dataCollection[apiObject].data, apiObject);
                    }
                } else {
                    // No data stored: request them
                    console.log('apiCurator: no recent data stored, requesting');

                    // Setup data structure
                    dataCollection[apiObject] = {
                        lastResourceVersion: 0,
                        data: [],
                        subscribed: false
                    };

                    // Request data
                    var self = this;
                    apiObjectHandler.requestObject(apiObject, function (success, response) {
                        self.apiRequestCallback(success, response, apiObject);
                        if (callback) {
                            callback(true, response.data.items, apiObject);
                        }
                    });
                }

            },

            requestWatch: function(apiObject, callback) {

            },

            /**
             * Callback when requesting data via apiService
             * @param success
             * @param data
             */
            apiRequestCallback: function(success, data, apiObject) {
                // Got data from the api
                console.log('got data for ' + apiObject);
                console.log(data);

                //$rootScope.$apply(function(){

                    dataCollection[apiObject].data = data.data.items;
                    dataCollection[apiObject].lastResourceVersion = data.data.metadata.resourceVersion;
                //});


            },

            /**
             * Subscribes to changes on the given apiObject
             *
             * @param apiObject
             * @param subscriberId
             * @param callback
             */
            watchData: function(apiObject, subscriberId, callback) {
                var resourceVersion = 0;
                if (dataCollection.hasOwnProperty(apiObject)) {
                    // Daten bestehen schon, resourceVersion setzen
                    resourceVersion = dataCollection[apiObject].lastResourceVersion;
                }

                var self = this;
                watchApiService.watchApi('groups', 'GroupsCtrl', function (apiObject, message) {
                    // Callback if something changes
                    $rootScope.$apply(function () {
                        var dataJson = angular.fromJson(message.data);
                        console.log('WS: ' + dataJson.type);
                        if (dataJson.type == 'ADDED') {
                            $rootScope.groups.push(dataJson.object);
                        }
                    }, resourceVersion);

                });
            },




            init : function () {

              /**  var groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function (apiObject, message) {
                    // Callback if something changes
                    $rootScope.$apply(function () {
                        console.log('apply root scope');
                        groups.push({metadata:{name:'group two'}});
                    });
                });*/
            }
        }
    });