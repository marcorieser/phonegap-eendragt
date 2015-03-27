angular.module('eendragt.game', [
    'ngRoute',
    'eendragt.game.services',
    'eendragt.game.directives'
])

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

    .controller('eendragt.game.index', function ($rootScope, GameHandler) {
        $rootScope.gameHandler = GameHandler.getInstance(0);
    })

    .controller('eendragt.game.play', function ($rootScope, $location) {
        if ($rootScope.gameHandler === undefined) {
            $location.path('/game');
        }
    })

    .controller('eendragt.game.victory', function () {
    })

    .controller('eendragt.game.doomed', function () {
    });