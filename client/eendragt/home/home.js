angular.module('eendragt.home', [
    'ngRoute'
])

    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            controller: 'eendragt.home.index',
            templateUrl: 'eendragt/home/home-index.html'
        }).otherwise({ redirectTo: '/' });
    })

    .controller('eendragt.home.index', function ($scope) {
        $scope.$root.controllerName = 'eendragt-home-index';
        $scope.$root.width = $(window).width();
    });