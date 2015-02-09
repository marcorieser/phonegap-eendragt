module eendragt.game {
    angular.module('eendragt.game', [
        'ngRoute'
    ])

        .config(function ($routeProvider) {
            $routeProvider.when('/game', {
                controller: 'eendragt.game.index',
                templateUrl: 'eendragt/game/game-index.html'
            });
        })

        .controller('eendragt.game.index', function ($scope) {
            $scope.$root.controllerName = 'eendragt-game-index';
        })

        .directive('gameMap', function () {

            return {
                restrict: 'E',
                scope: {
                    'fields': '='
                },
                templateUrl: 'eendragt/game/game-map.html'
            };
        });
}