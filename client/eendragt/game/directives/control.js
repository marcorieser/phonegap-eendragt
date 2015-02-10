angular.module('eendragt.game.directives.control', [])
    .directive('control', function (Ship) {
        return {
            'scope':       {
                game: '='
            },
            'templateUrl': 'eendragt/game/directives/control.html',
            'restrict':    'E',
            link:          function ($scope) {
                $scope.direction = 'h';

                $scope.create = function () {
                    $scope.game.addShip(Ship.createShip($scope.x, $scope.y, $scope.length, $scope.direction));
                    console.log($scope.x, $scope.y);
                };

                $scope.game.addShip(Ship.createShip(1, 1, 4, 'v'));
            }
        };
    });
