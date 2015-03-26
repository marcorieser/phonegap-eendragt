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