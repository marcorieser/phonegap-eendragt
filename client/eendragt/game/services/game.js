angular.module('eendragt.game.services.game', [])
    .factory('Game', function (Ship) {
        return {
            start: function () {
                var game = {
                    uuid: '1234',
                    ships: [],
                    x: 8,
                    y: 8,
                    addShip: function (ship) {
                        this.ships.push(ship);
                    }
                };

                return game;
            }
        };
    });
