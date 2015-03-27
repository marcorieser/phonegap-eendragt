/**
 * map.js
 * This file includes the map directive module of the eendragt application.
 * @author Marco Rieser
 * @version 18.0 */

 angular.module('eendragt.game.directives.map', [])
    .directive('map', function ($rootScope) {
        return {
            'scope': {
                type: "@"
            },
            'templateUrl': 'eendragt/game/directives/map.html',
            'restrict': 'E',
            link: function ($scope) {
                var gameHandler = $rootScope.gameHandler,
                    game = gameHandler.getPlayer(0).game;

                // Assign the fieldset based on the map type in the scope
                $scope.fields = $scope.type === '0' ? game.fields : game.guessFields;

                /**
                 * guess
                 * The guess function triggers a guess on the gamehandler
                 * @param x
                 * @param y
                 */
                $scope.guess = function (x, y) {

                    // Return if the map is not the guessMap
                    if($scope.type === '0') {
                        return;
                    }

                    // Return if its not my turn to guess
                    if(gameHandler.currentPlayer === 1) {
                        return;
                    }
                    gameHandler.guess(x, y);
                };
            }
        };
    });
