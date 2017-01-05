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
        'userService',
        'loginService'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

