angular.module('eendragt.game.services.ship', [])
    .factory('Ship', function () {
        return {
            createShip: function (x, y) {
                return {
                    name: 'Destroyer',
                    positions: [
                        {
                            x: x,
                            y: y,
                            hit: true
                        }
                    ],
                    destroyed: false,
                    getPosition: function (x, y) {
                        var $value;


                        angular.forEach(this.positions, function (position) {
                            if ($value !== undefined) {
                                return;
                            }

                            if (window.parseInt(position.x, 10) !== window.parseInt(x, 10)) {
                                return;
                            }

                            if (window.parseInt(position.y, 10) !== window.parseInt(y, 10)) {
                                return;
                            }

                            $value = position;
                        });

                        return $value;
                    },
                    isOnPosition: function (x, y) {
                        return this.getPosition(x, y) !== undefined;
                    }
                };
            },
            getShip: function (ships, x, y) {
                var returnShip;

                angular.forEach(ships, function (ship) {
                    if (ship.isOnPosition(x, y)) {
                        returnShip = ship;
                    }
                });

                return returnShip;
            }
        };
    });
