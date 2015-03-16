angular.module('eendragt.game.services.ship', [])
    .factory('Ship', function () {
        return {
            create: function (x, y, elements, direction, name) {
                var positions = [],
                    setPositions = function () {
                        var positions = [];

                        for (var i = 0; i < elements; i++) {
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
                elements = window.parseInt(elements, 10);

                positions = setPositions();

                return {
                    name: name,
                    direction: direction,
                    destroyed: false,

                    getPositions: function () {
                        return positions;
                    },

                    getPosition: function (x, y) {
                        var $value;

                        angular.forEach(positions, function (position) {
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
                        var $destroyed = true;

                        angular.forEach(positions, function (position) {
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
