angular.module('eendragt.game.directives.field', [])
    .directive('field', function () {
        return {
            'scope':       {
                'x':    '=',
                'y':    '=',
                'ship': '='
            },
            'templateUrl': 'eendragt/game/directives/field.html',
            'restrict':    'E',
            link:          function ($scope) {
                $scope.showme = function () {
                    $scope.ship.hit($scope.x, $scope.y);
                };
            }
        };
    });
