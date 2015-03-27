/**
 * ship.js
 * This file includes the ship directive module of the eendragt application.
 * @author Marco Rieser
 * @version 5.0 */

angular.module('eendragt.game.directives.ship', [])
    .directive('ship', function () {
        return {
            'scope': false,
            'templateUrl': 'eendragt/game/directives/ship.html',
            'restrict': 'E'
        };
    });
