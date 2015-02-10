angular.module('eendragt.game.services.game', [])
    .factory('Game', function () {
        return {
            start: function (x, y) {
                var game = {
                    uuid:    Math.random().toString(9).substring(2, 12),
                    ships:   [],
                    x:       x,
                    y:       y,
                    addShip: function (ship) {
                        this.ships.push(ship);
                    }
                };

                return game;
            }
        };
    });
