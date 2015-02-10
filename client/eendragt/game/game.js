angular.module('eendragt.game', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/game', {
            controller:  'eendragt.game.index',
            templateUrl: 'eendragt/game/game-index.html'
        });
    })

    .controller('eendragt.game.index', function ($scope) {
        $scope.$root.controllerName = 'eendragt-game-index';

        $scope.fields = {
            0: {
                0: 'Field 0:0',
                1: 'Field 0:1',
                2: 'Field 0:2'
            },
            1: {
                0: 'Field 1:0',
                1: 'Field 1:1',
                2: 'Field 1:2'
            },
            2: {
                0: 'Field 2:0',
                1: 'Field 2:1',
                2: 'Field 2:2'
            }
        };
    })

    .factory('Ships', [
        function () {
            var ships = {
                'ship-five': {
                    length: 5,
                    pos:    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 }
                    ]
                },
                'ship-four': {
                    length: 4
                }

            };
        }
    ])

    .factory('System', [
        function (Ships) {
            var gameStarted = false;

            return {
                newGame: function () {
                    gameStarted = true;

                }

            };
        }
    ]);