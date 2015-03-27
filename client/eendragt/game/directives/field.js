/**
 * field.js
 * This file includes the field directive module of the eendragt application.
 * @author Marco Rieser
 * @version 12.0 */

 angular.module('eendragt.game.directives.field', [])
    .directive('field', function () {
        return {
            'scope': {
                'x': '=',
                'y': '=',
                'ship' : '='
            },
            'templateUrl': 'eendragt/game/directives/field.html',
            'restrict': 'E'
        };
    });
