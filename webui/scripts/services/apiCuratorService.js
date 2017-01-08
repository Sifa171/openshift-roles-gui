/**
 * Service to curate data from the api
 * These service can get initial data for an apiObject
 * If you subscribe to an apiObject the curator will monitor changes and inform you if they occur
 * Based on the last resourceVersion the curator only gathers changes over the websocket
 *
 * Created by meissner on 07.01.17.
 */

angular.module("apiCuratorService", [])
    .factory('apiCurator', function (loginInformation, $http, $rootScope, watchApiService) {

        // List with all collected data
        // index is the apiObject
        // The value contains
        //  lastResourceVersion resourceVersion of the last received data
        //  data                array with the data
        //  subscribed          true if the curator is subscribed to the data
        var dataCollection = {};

        return {

            /**
             * Requests the data of apiObject
             * If data from a given apiObject is already subscribed, a requestData call only returns the current version of data without requesting it
             * if onlyInitial=true the data doesn't have to be the latest, because it is afterwards watched
             *
             * @param apiObject
             * @param callback
             * @param onlyInitial only for initial data
             */
            requestData: function(apiObject, callback, onlyInitial) {

            },

            /**
             * Subscribes to changes on the given apiObject
             *
             * @param apiObject
             * @param subscriberId
             * @param callback
             */
            watchData: function(apiObject, subscriberId, callback) {

            },


            init : function () {

                var groupsWs = watchApiService.watchApi('groups', 'GroupsCtrl', function (apiObject, message) {
                    // Callback if something changes
                    $rootScope.$apply(function () {
                        console.log('apply root scope');
                        groups.push({metadata:{name:'group two'}});
                    });
                });
            }
        }
    });