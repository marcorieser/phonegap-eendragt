angular.module('eendragt.game.directives.field', [])
    .directive('field', function () {
        return {
            'scope': {
                'x': '=',
                'y': '=',
                'ship' : '='
            },
            'templateUrl': 'eendragt/game/directives/field.html',
            'restrict': 'E',
            link: function ($scope, element, attr) {
                $scope.$eval('ship', function(value){
                    console.log(value);
                });
            }
        };
    });
