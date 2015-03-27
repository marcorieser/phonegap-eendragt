/**
 * game-directives.js
 * This file includes the game-directives module of the eendragt application.
 * @author Marco Rieser
 * @version 2.0 */

// All game directives are injected as dependencies
angular.module('eendragt.game.directives', [
    'eendragt.game.directives.ship',
    'eendragt.game.directives.map',
    'eendragt.game.directives.field'
]);