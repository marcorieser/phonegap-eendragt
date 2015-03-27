/**
 * eendragt.js
 * This file includes the main module of the eendragt application which loads all dependencies.
 * @author Marco Rieser
 * @version 3.0 */

// The eendragt moduele gets defined and loads all dependencies
angular.module('eendragt', [
    'ngCordova',
    'eendragt.engine',
    'templates-app',
    'ngRoute',
    'ngAnimate',
    'LocalForageModule',
    'eendragt.home',
    'eendragt.instructions',
    'eendragt.game'
])
    // The locationProvider gets configured and a prefix is added
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    });

// The screen width is set as font-size to
// the html tag for later usage in the LESS with the rem units
(function ($) {
    var width = $(window).width();
    $('html').css('font-size', width / 10);
}(jQuery));