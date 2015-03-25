angular.module('eendragt.engine.directives.sound', [])
    .directive('sound', function ($localForage, $rootScope) {
        return {
            'scope': false,
            'restrict': 'E',
            link: function ($scope) {
                console.log('huh');
                $localForage.bind($rootScope, 'mute');
            }
        };
    });
