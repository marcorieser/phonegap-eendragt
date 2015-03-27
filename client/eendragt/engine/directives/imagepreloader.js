/**
 * imagepreloader.js
 * This file includes the imagepreloader directive module of the eendragt application.
 * @author Marco Rieser
 * @version 1.0 */

 angular.module('eendragt.engine.directives.imagepreloader', [])
    .directive('imagepreloader', function () {
        return {
            'scope': false,
            'templateUrl': 'eendragt/engine/directives/imagepreloader.html',
            'restrict': 'E'
        };
    });
