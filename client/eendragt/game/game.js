angular.module('eendragt.game', [
    'ngRoute',
    'eendragt.game.services',
    'eendragt.game.directives'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/game', {
            controller:  'eendragt.game.index',
            templateUrl: 'eendragt/game/game-index.html'
        });
    })

    .controller('eendragt.game.index', function ($scope, Game, Config) {
        $scope.$root.controllerName = 'eendragt-game-index';
        $scope.game = Game.start(Config.fields.x, Config.fields.y);
        $scope.game.placeShipsRandomly(Config.ships);
    });