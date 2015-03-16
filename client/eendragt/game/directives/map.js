angular.module('eendragt.game.directives.map', [])
    .directive('map', function (Ship, AI) {
        return {
            'scope': {
                game: "="
            },
            'templateUrl': 'eendragt/game/directives/map.html',
            'restrict': 'E',
            link: function ($scope) {
                $scope.aiGuess = function() {
                    AI.guess();
                };

            }
        };
    });
