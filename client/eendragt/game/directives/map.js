angular.module('eendragt.game.directives.map', [])
    .directive('map', function ($rootScope) {
        return {
            'scope': {
                type: "@"
            },
            'templateUrl': 'eendragt/game/directives/map.html',
            'restrict': 'E',
            link: function ($scope) {
                var game = $rootScope.gameHandler.getPlayer(0).game;
                $scope.game = game;
                $scope.fields = $scope.type === 0 ? game.fields : game.guessFields;
            }
        };
    });
