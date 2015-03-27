/**
 * game.js
 * This file includes the game module of the eendragt application.
 * @author Marco Rieser
 * @version 8.0 */


// The instructions module gets instantiated
angular.module('eendragt.game', [
    'ngRoute',
    'eendragt.game.services',
    'eendragt.game.directives'
])

    // According to the url segments we define some new routes
    // which load the controllers and templates
    .config(function ($routeProvider) {
        $routeProvider
            .when('/game', {
                controller: 'eendragt.game.index',
                templateUrl: 'eendragt/game/game-index.html'
            })
            .when('/game/play', {
                controller: 'eendragt.game.play',
                templateUrl: 'eendragt/game/game-play.html'
            })

            .when('/game/victory', {
                controller: 'eendragt.game.victory',
                templateUrl: 'eendragt/game/game-victory.html'
            })

            .when('/game/doomed', {
                controller: 'eendragt.game.doomed',
                templateUrl: 'eendragt/game/game-doomed.html'
            });
    })

    // In this controller the gameHandler service gets intantiated and the reference
    // gets assigned to the rootScope as gameHandler
    .controller('eendragt.game.index', function ($rootScope, GameHandler) {
        $rootScope.gameHandler = GameHandler.getInstance(0);
    })

    // This controller checks if a gameHandler is defined otherwise
    // the application redirects to the game-index
    .controller('eendragt.game.play', function ($rootScope, $location) {
        if ($rootScope.gameHandler === undefined) {
            $location.path('/game');
        }
    })

    // An controller has to be defined in AngularJS so we
    // instantiate an empty controller at the moment
    .controller('eendragt.game.victory', function () {
    })

    // An controller has to be defined in AngularJS so we
    // instantiate an empty controller at the moment
    .controller('eendragt.game.doomed', function () {
    });