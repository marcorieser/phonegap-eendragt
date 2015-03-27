/**
 * engine-directives.js
 * This file includes the engine-directives module of the eendragt application.
 * @author Marco Rieser
 * @version 2.0 */

// All engine directives are injected as dependencies
angular.module('eendragt.engine.directives', [
    'eendragt.engine.directives.sound',
    'eendragt.engine.directives.imagepreloader'
]);
