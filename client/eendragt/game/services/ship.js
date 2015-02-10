angular.module('eendragt.game.services.ship', [])
    .factory('Ship', function () {
        return {
            createShip: function (x, y, length, direction) {
                var setPositions = function () {
                    var positions = [];

                    for (var i = 0; i < length; i++) {
                        if (direction === 'h') {
                            positions.push({ x: x + i, y: y, hit: false });
                        } else {
                            positions.push({ x: x, y: y + i, hit: false });
                        }
                    }
                    return positions;
                };

                x = window.parseInt(x, 10);
                y = window.parseInt(y, 10);
                length = window.parseInt(length, 10);

                return {
                    positions: setPositions(),
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
                    },

                    isDestroyed: function () {
                        $destroyed = true;

                        angular.forEach(this.positions, function (position) {
                            if ($destroyed === false) {
                                return;
                            }

                            if (position.hit === false) {
                                $destroyed = false;
                            }
                        });

                        this.destroyed = $destroyed;

                        return $destroyed;
                    },

                    hit: function (x, y) {
                        var position = this.getPosition(x, y);
                        if (position !== undefined) {
                            position.hit = true;
                        }
                    }
                };
            },
            getShip:    function (ships, x, y) {
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
