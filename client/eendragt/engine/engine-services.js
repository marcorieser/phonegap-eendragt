/**
 * engine-services.js
 * This file includes the engine-services module of the eendragt application.
 * @author Marco Rieser
 * @version 4.0 */

// All engine services are injected as dependencies
angular.module('eendragt.engine.services', [
    'eendragt.engine.services.config',
    'eendragt.engine.services.gamehandler',
    'eendragt.engine.services.player',
    'eendragt.engine.services.ai',
    'eendragt.engine.services.sound'
]);
