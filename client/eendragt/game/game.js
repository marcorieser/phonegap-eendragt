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

    .controller('eendragt.game.index', function ($scope, Game) {
        $scope.$root.controllerName = 'eendragt-game-index';
        $scope.game = Game.start();
    });