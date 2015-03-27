/**
 * game-services.js
 * This file includes the game-services module of the eendragt application.
 * @author Marco Rieser
 * @version 2.0 */

// All game services are injected as dependencies
angular.module('eendragt.game.services', [
    'eendragt.game.services.game',
    'eendragt.game.services.ship'
]);
