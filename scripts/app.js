/**
 * Created by meissner&dehn on 05.01.17.
 */
'use strict';

angular
    .module('webuiApp', [
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'nvd3',
        'LocalStorageModule',
        'patternfly',
        'patternfly.charts',
        'userService'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

