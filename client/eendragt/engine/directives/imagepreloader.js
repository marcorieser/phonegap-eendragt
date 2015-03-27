angular.module('eendragt.engine.directives.imagepreloader', [])
    .directive('imagepreloader', function () {
        return {
            'scope': false,
            'templateUrl': 'eendragt/engine/directives/imagepreloader.html',
            'restrict': 'E'
        };
    });
