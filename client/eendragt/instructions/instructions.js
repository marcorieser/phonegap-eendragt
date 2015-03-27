angular.module('eendragt.instructions', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/instructions', {
            controller:  'eendragt.instructions.index',
            templateUrl: 'eendragt/instructions/instructions-index.html'
        });
    })

    .controller('eendragt.instructions.index', function () {});
