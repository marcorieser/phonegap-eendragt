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
                var field = y * length + x;
                return field;
            },
            getRandomCoord = function (size, length) {
                var p = -1,
                    rdm;
                while (p === -1) {
                    rdm = Math.floor(Math.random() * 10);
                    if (rdm + length <= size) {
                        p = rdm;
                    }
                }
                return p;
            };

        return {
            start: function (x, y) {
                var game = {
                    uuid:               Math.random().toString(9).substring(2, 12),
                    ships:              [],
                    x:                  x,
                    y:                  y,
                    availableFields:    setFields(x, y),
                    addShip:            function (ship) {
                        this.ships.push(ship);
                    },
                    getField:           function (x, y) {
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
                                size,
                                errors = 0;
                            hasSpace = false;
                            while (!hasSpace) {
                                var i,
                                    field;
                                direction = Math.random() > 0.5 ? 'h' : 'v';
                                size = direction === 'h' ? self.x : self.y;
                                x = getRandomCoord(size, ship.elements);
                                y = getRandomCoord(size, ship.elements);

                                for (i = 0; i < ship.elements; i++) {
                                    if (direction === 'h') {
                                        field = self.getField(x + i, y);
                                    } else {
                                        field = self.getField(x, y + i);
                                    }

                                    errors = field.status ? errors : errors++;
                                }

                                console.log(errors);

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

                return game;
            }
        };
    });
