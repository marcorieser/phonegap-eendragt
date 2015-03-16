angular.module('eendragt.game.directives.map', [])
    .directive('map', function (Ship, AI) {
        return {
            'scope': {
                game: "="
            },
            'templateUrl': 'eendragt/game/directives/map.html',
            'restrict': 'E',
            link: function ($scope) {
                var fields = [];

                for (var i = 0; i < $scope.game.y; i++) {
                    if (fields[i] === undefined) {
                        fields[i] = [];
                    }

                    for (var j = 0; j < $scope.game.x; j++) {
                        if (fields[i][j] === undefined) {
                            fields[i][j] = {
                                x: j,
                                y: i,
                                ship: Ship.getShip($scope.game.ships, j, i)
                            };
                        }
                    }
                }
                $scope.fields = fields;

                $scope.aiGuess = function() {
                    AI.guess();
                };

            }
        };
    });
