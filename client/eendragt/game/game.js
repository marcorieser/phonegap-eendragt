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
            .when('/game/prepare', {
                controller: 'eendragt.game.prepare',
                templateUrl: 'eendragt/game/game-prepare.html'
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

    .controller('eendragt.game.index', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-index';
    })

    .controller('eendragt.game.prepare', function ($scope, $rootScope, GameHandler) {
        $scope.$root.controllerName = 'eendragt-game-prepare';
        $rootScope.gameHandler = GameHandler.getInstance(0);
    })

    .controller('eendragt.game.play', function ($scope, $rootScope, $location) {
        $scope.$root.controllerName = 'eendragt-game-play';
        if ($rootScope.gameHandler === undefined) {
            $location.path('/game/prepare');
        }
    })
    .controller('eendragt.game.victory', function ($scope, $rootScope) {
        $scope.$root.controllerName = 'eendragt-game-victory';
        $rootScope.gameHandler = undefined;
    })
    .controller('eendragt.game.doomed', function ($scope, $rootScope) {
        $scope.$root.controllerName = 'eendragt-game-doomed';
        $rootScope.gameHandler = undefined;
    })

;