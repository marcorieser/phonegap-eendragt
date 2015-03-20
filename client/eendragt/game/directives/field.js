angular.module('eendragt.game.directives.field', [])
    .directive('field', function () {
        return {
            'scope': {
                'x': '=',
                'y': '='
            },
            'templateUrl': 'eendragt/game/directives/field.html',
            'restrict': 'E'
        };
    });
