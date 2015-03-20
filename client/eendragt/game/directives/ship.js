angular.module('eendragt.game.directives.ship', [])
    .directive('ship', function () {
        return {
            'scope': {
                ship : '='
            },
            'templateUrl': 'eendragt/game/directives/ship.html',
            'restrict': 'E'
        };
    });
