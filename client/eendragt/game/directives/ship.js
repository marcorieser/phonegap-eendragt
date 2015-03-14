angular.module('eendragt.game.directives.ship', [])
    .directive('ship', function () {
        return {
            'scope': {
                'ship': '=',
                'x': '=',
                'y': '='
            },
            'templateUrl': 'eendragt/game/directives/ship.html',
            'restrict': 'E'
        };
    });
