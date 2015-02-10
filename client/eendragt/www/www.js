angular.module('eendragt.www', [
    'ngRoute'
])

    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            controller:  'eendragt.www.index',
            templateUrl: 'eendragt/www/www-index.html'
        }).otherwise({ redirectTo: '/' });
    })

    .controller('eendragt.www.index', function ($scope) {
        $scope.$root.controllerName = 'eendragt-www-index';
    });