angular.module('eendragt.game.directives.map', [])
    .directive('map', function ($rootScope) {
        return {
            'scope': {
                type: "@"
            },
            'templateUrl': 'eendragt/game/directives/map.html',
            'restrict': 'E',
            link: function ($scope) {
                var gameHandler = $rootScope.gameHandler,
                    game = gameHandler.getPlayer(0).game;
                $scope.fields = $scope.type === '0' ? game.fields : game.guessFields;

                // Just temporary
                $scope.player = gameHandler.currentPlayer;

                $scope.guess = function (x, y) {
                    gameHandler.guess(x, y);
                };
            }
        };
    });
