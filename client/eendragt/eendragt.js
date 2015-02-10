angular.module('eendragt', [
    'config',
    'templates-app',
    'ngRoute',
    'ngAnimate',
    'LocalForageModule',
    'eendragt.www',
    'eendragt.instructions',
    'eendragt.game'
])

    .config(function ($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    });