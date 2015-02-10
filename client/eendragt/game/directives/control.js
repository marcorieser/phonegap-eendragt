angular.module('eendragt.game.directives.control', [])
    .directive('control', function (Ship) {
        return {
            'scope': {
                game: '='
            },
            'templateUrl': 'eendragt/game/directives/control.html',
            'restrict': 'E',
            link: function ($scope) {
                $scope.create = function() {
                    $scope.game.addShip(Ship.createShip($scope.x, $scope.y));
                };
            }
        };
    });
