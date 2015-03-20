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

                $scope.guess = function (x, y) {
                    if($scope.type === '0') {
                        return;
                    }
                    gameHandler.guess(x, y);
                };
            }
        };
    });
