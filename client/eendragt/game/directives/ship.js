angular.module('eendragt.game.directives.ship', [])
    .directive('ship', function () {
        return {
            'scope': {
                ship: '='
            },
            'templateUrl': 'eendragt/game/directives/ship.html',
            'restrict': 'E',
            link: function () {
                var positionize = function (x, y) {
                    var xPos = x * 11.111111111,
                        yPos = y * 11.111111111;

                    return 'left: ' + xPos + '%; top: ' + yPos + '%;';
                };
            }
        };
    });
