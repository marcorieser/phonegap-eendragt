angular.module('eendragt', [
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