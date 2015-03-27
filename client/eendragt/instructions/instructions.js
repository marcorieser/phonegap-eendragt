/**
 * instructions.js
 * This file includes the instructions module of the eendragt application.
 * @author Marco Rieser
 * @version 4.0 */


// The instructions module gets instantiated
angular.module('eendragt.instructions', [
    'ngRoute'
])

    // A new route gets defined which loads the template
    // and starts the controller due to the internal url
    .config(function ($routeProvider) {
        $routeProvider.when('/instructions', {
            controller:  'eendragt.instructions.index',
            templateUrl: 'eendragt/instructions/instructions-index.html'
        });
    })

    // An controller has to be defined in AngularJS so we
    // instantiate an empty controller at the moment
    .controller('eendragt.instructions.index', function () {});
