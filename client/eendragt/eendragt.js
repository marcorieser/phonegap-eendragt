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

    .config(function ($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    });

(function($) {
    var width = $(window).width();
    $('html').css('font-size', width/10);
}(jQuery));