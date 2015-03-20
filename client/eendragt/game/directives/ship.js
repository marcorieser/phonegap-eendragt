angular.module('eendragt.game.directives.ship', [])
    .directive('ship', function () {
        return {
            'scope': false,
            'templateUrl': 'eendragt/game/directives/ship.html',
            'restrict': 'E'
        };
    });
