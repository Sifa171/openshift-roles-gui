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
        'loginService',
        'watchApiService',
        'apiService'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/groups', {
                templateUrl: 'views/groups.html',
                controller: 'GroupsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

