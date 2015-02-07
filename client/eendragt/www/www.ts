module eendragt.www {
    angular.module('eendragt.www', [
        'templates-app',
        'ngRoute',
        //'ngAnimate',
        'eendragt.instructions',
        'eendragt.game'
    ])

        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(false).hashPrefix('!');

            $routeProvider.when('/', {
                controller: 'eendragt.www.index',
                templateUrl: 'eendragt/www/www-index.html'
            }).otherwise({redirectTo: '/'});
        })

        .controller('eendragt.www.index', function ($scope) {
            $scope.$root.controllerName = 'eendragt.www.index';
        });
}