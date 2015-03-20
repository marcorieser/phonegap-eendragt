angular.module('eendragt.game.directives.field', [])
    .directive('field', function () {
        return {
            'scope': {
                'x': '=',
                'y': '='
            },
            'templateUrl': 'eendragt/game/directives/field.html',
            'restrict': 'E'/*,
            link: function ($scope) {
                var xPos = $scope.x * 11.111111111,
                    yPos = $scope.y * 11.111111111;

                $scope.position = 'left: ' + xPos + '%; top: ' + yPos + '%;';
            }*/
        };
    });
