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
            .when('/game/campaign', {
                controller: 'eendragt.game.campaign',
                templateUrl: 'eendragt/game/game-campaign.html'
            })
            .when('/game/online', {
                controller: 'eendragt.game.online',
                templateUrl: 'eendragt/game/game-online.html'
            })
            .when('/game/play', {
                controller: 'eendragt.game.play',
                templateUrl: 'eendragt/game/game-play.html'
            });
    })

    .controller('eendragt.game.index', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-index';
    })

    .controller('eendragt.game.campaign', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-campaign';
    })

    .controller('eendragt.game.online', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-online';
    })

    .controller('eendragt.game.play', function ($scope, Game, Config) {
        $scope.$root.controllerName = 'eendragt-game-play';
        $scope.game = Game.start(Config.fields.x, Config.fields.y);
        $scope.game.placeShipsRandomly(Config.ships);
        console.log($scope.game);
    });