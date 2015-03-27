/**
 * home.js
 * This file includes the home module of the eendragt application.
 * @author Marco Rieser
 * @version 3.0 */

// The home module gets instantiated
angular.module('eendragt.home', [
    'ngRoute'
])
    // A new route gets defined which loads the template
    // and starts the controller due to the internal url
    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            controller: 'eendragt.home.index',
            templateUrl: 'eendragt/home/home-index.html'
        })
            // If no path segment matches a route
            // the application loads the home module
            .otherwise({ redirectTo: '/' });
    })

    // An controller has to be defined in AngularJS so we
    // instantiate an empty controller at the moment
    .controller('eendragt.home.index', function () {});