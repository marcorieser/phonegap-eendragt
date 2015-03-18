angular.module('eendragt.game.services.game', [])
    .factory('Game', function (Ship, $rootScope) {
        var setFields = function (x, y) {
                var fields = [];
                for (var i = 0; i < y; i++) {
                    for (var j = 0; j < x; j++) {
                        fields.push({
                            x: j,
                            y: i,
                            available: true,
                            status: 'covered',
                            ship: undefined
                        });
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
                    ships: [],
                    fields: setFields(x, y),
                    guessFields: setFields(x, y),
                    x: x,
                    y: y,

                    addShip: function (ship) {
                        this.ships.push(ship);
                    },
                    getField: function (x, y, fields) {
                        var field = getFieldNumber(this.x, x, y);

                        fields = fields || this.fields;

                        return fields[ field ];
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

                                    if (field.available === false) {
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
                                        field.available = false;
                                    }
                                }
                            }
                            self.addShip(Ship.create(x, y, ship.elements, direction, ship.name));
                        });

                        angular.forEach(this.ships, function (ship) {
                            var positions = ship.getPositions();
                            angular.forEach(positions, function (position) {
                                var field = self.getField(position.x, position.y);
                                field.ship = ship;
                            });
                        });

                    },
                    guess: function (x, y) {
                        var result = {
                                hit: undefined,
                                destroyed: undefined,
                                status: 'opened',
                                positions: []
                            },
                            field = this.getField(x, y);

                        if (field.status === 'opened') {
                            return;
                        }

                        if (field.ship) {
                            result.hit = field.ship.hit(x, y);
                            result.destroyed = field.ship.isDestroyed();

                            if (result.destroyed === true) {
                                result.status = 'destroyed';
                                angular.forEach(field.ship.getPositions(), function (position) {
                                    result.positions.push({ x: position.x, y: position.y });
                                });
                            } else {
                                result.status = 'hit';
                                result.positions.push({ x: x, y: y });
                            }
                        } else {
                            result.positions.push({ x: x, y: y });
                        }

                        field.status = 'opened';

                        return result;
                    },
                    setGuessFieldStatus: function (fieldset) {
                        var self = this;
                        angular.forEach(fieldset.positions, function (position) {
                            var field = self.getField(position.x, position.y, self.guessFields);
                            field.status = fieldset.status;
                        });
                    }
                };
            }
        };
    });