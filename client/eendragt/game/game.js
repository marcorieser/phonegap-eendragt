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

    .controller('eendragt.game.index', function ($scope, $rootScope, GameHandler) {
        $scope.$root.controllerName = 'eendragt-game-index';
        $rootScope.gameHandler = GameHandler.getInstance(0);
    })

    .controller('eendragt.game.play', function ($scope, $rootScope, $location) {
        $scope.$root.controllerName = 'eendragt-game-play';
        if ($rootScope.gameHandler === undefined) {
            $location.path('/game');
        }
    })
    .controller('eendragt.game.victory', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-victory';
    })
    .controller('eendragt.game.doomed', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-doomed';
    })

;