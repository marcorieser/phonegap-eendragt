module eendragt.instructions {
    angular.module('eendragt.instructions', [
        'ngRoute'
    ])

        .config(function ($routeProvider) {
            $routeProvider.when('/instructions', {
                controller: 'eendragt.instructions.index',
                templateUrl: 'eendragt/instructions/instructions-index.html'
            });
        })

        .controller('eendragt.instructions.index', function ($scope) {
            $scope.$root.controllerName = 'eendragt.instructions.index';
        });
}