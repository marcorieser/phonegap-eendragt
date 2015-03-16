angular.module('eendragt.game.services.game', [])
    .factory('Game', function (Ship) {
        var setFields = function (x, y) {
                var fields = [];
                for (var i = 0; i < y; i++) {
                    for (var j = 0; j < x; j++) {
                        fields.push({ status: true, x: j, y: i });
                    }
                }
                return fields;
            },
            getFieldNumber = function (length, x, y) {
                return y * length + x;
            },
            getRandomCoord = function (size, length) {
                var max = size - length + 1;
                return (~~(Math.random() * max));
            };

        return {
            start: function (x, y) {
                return {
                    uuid: Math.random().toString(9).substring(2, 12),
                    ships: [],
                    x: x,
                    y: y,
                    availableFields: setFields(x, y),
                    addShip: function (ship) {
                        this.ships.push(ship);
                    },
                    getField: function (x, y) {
                        var field = getFieldNumber(this.x, x, y);
                        return this.availableFields[ field ];
                    },
                    placeShipsRandomly: function (ships) {
                        var self = this,
                            hasSpace;
                        angular.forEach(ships, function (ship) {
                            var x,
                                y,
                                direction,
                                errors;
                            hasSpace = false;
                            while (!hasSpace) {
                                errors = 0;
                                var i,
                                    field;
                                direction = Math.random() > 0.5 ? 'h' : 'v';

                                if (direction === 'h') {
                                    x = getRandomCoord(self.x, ship.elements);
                                    y = getRandomCoord(self.y, 1);
                                } else {
                                    x = getRandomCoord(self.x, 1);
                                    y = getRandomCoord(self.y, ship.elements);
                                }

                                for (i = 0; i < ship.elements; i++) {
                                    if (direction === 'h') {
                                        field = self.getField(x + i, y);
                                    } else {
                                        field = self.getField(x, y + i);
                                    }

                                    if (field.status === false) {
                                        errors++;
                                    }
                                }

                                hasSpace = errors === 0;

                                if (hasSpace) {
                                    for (i = 0; i < ship.elements; i++) {
                                        if (direction === 'h') {
                                            field = self.getField(x + i, y);
                                        } else {
                                            field = self.getField(x, y + i);
                                        }
                                        field.status = false;
                                    }
                                }
                            }
                            self.addShip(Ship.create(x, y, ship.elements, direction, ship.name));
                        });
                    }
                };
            }
        };
    });