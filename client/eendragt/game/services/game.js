angular.module('eendragt.game.services.game', [])
    .factory('Game', function (Ship) {
        return {
            start: function (x, y) {
                var game = {
                    uuid:    '1234',
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
