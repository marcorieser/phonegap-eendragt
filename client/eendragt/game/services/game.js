/**
 * game.js
 * This file includes the game service module of the eendragt application.
 * @author Marco Rieser
 * @version 18.0 */

angular.module('eendragt.game.services.game', [])
    // A new factory gets defined
    .factory('Game', function (Ship) {

        /**
         * setFields
         * The set Fields function generates an array of field objects
         * based on the values of x and y
         * @param x
         * @param y
         * @returns fields
         */
        var setFields = function (x, y) {
                var fields = [];

                // For each coordinate a field object gets created
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

            /**
             * clearFields
             * The cleanFields function resets the availability
             * and the ship status of each field in the set
             * @param fields
             * @returns fields
             */
            clearFields = function (fields) {
                var i = 0;

                // Each field gets reseted
                for (i; i < fields.length; i++) {
                    fields[ i ].available = true;
                    fields[ i ].ship = undefined;
                }

                return fields;
            },

            /**
             * getFieldNumber
             * The getFieldNumber function returns the position
             * in the field array based on the coordinate system
             * @param length
             * @param x
             * @param y
             * @returns position
             */
            getFieldNumber = function (length, x, y) {
                return y * length + x;
            },

            /**
             * getRandomCoord
             * The getRandomCoord generates a random number
             * in the coordinate system
             * @param size
             * @param length
             * @returns number
             */
            getRandomCoord = function (size, length) {
                var max = size - length + 1;
                return (~~(Math.random() * max));
            };

        // This are the public methods
        return {

            /**
             * start
             * The start function instantiates a new game
             * @param x
             * @param y
             * @returns Game instance object
             */
            start: function (x, y) {

                // This are the public methods in the game instance
                return {
                    ships: [],
                    fields: setFields(x, y),
                    guessFields: setFields(x, y),
                    x: x,
                    y: y,

                    /**
                     * addShip
                     * The addShip function adds a ship object
                     * to the ships array in the game
                     * @param ship
                     */
                    addShip: function (ship) {
                        this.ships.push(ship);
                    },

                    /**
                     * getField
                     * The getField function returns the field
                     * based on the coordinates
                     * @param x
                     * @param y
                     * @param fields
                     * @returns field
                     */
                    getField: function (x, y, fields) {
                        var field = getFieldNumber(this.x, x, y);

                        // If the fields are undefined the public fieldset is assigned
                        fields = fields || this.fields;

                        return fields[ field ];
                    },

                    /**
                     * placeShipsRandomly
                     * The placeShipsRandomly places a set of ships randomly
                     * on the map and checks that no ships are overlapping
                     * @param ships
                     */
                    placeShipsRandomly: function (ships) {
                        var self = this,
                            hasSpace;

                        // All fields get cleared before ships are added
                        this.fields = clearFields(this.fields);

                        // The ships inside the game instance are reseted
                        this.ships = [];

                        // For each ship the placing gets calculated
                        angular.forEach(ships, function (ship) {
                            var x,
                                y,
                                direction,
                                errors;
                            hasSpace = false;

                            // As long as the ship is not placable
                            // a new position gets calculated
                            while (!hasSpace) {
                                errors = 0;
                                var i,
                                    field;

                                // The direction of the ship gets randomly defined
                                direction = Math.random() > 0.5 ? 'h' : 'v';

                                // A random coordinate gets defined based on the direction
                                if (direction === 'h') {
                                    x = getRandomCoord(self.x, ship.elements);
                                    y = getRandomCoord(self.y, 1);
                                } else {
                                    x = getRandomCoord(self.x, 1);
                                    y = getRandomCoord(self.y, ship.elements);
                                }

                                // For each element inside the ship the affected
                                // fields get checked on availability
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

                                // If no errors occured during the check
                                // the ship has space on the map
                                hasSpace = errors === 0;

                                // If the ship has space all fields availability
                                // are set to false so no other ship can be placed on it
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

                            // The ship gets created from the ship service
                            // and added to the ship array of the game instance
                            self.addShip(Ship.create(x, y, ship.elements, direction, ship.name));
                        });

                        // Each field of each ship element gets assigned to the ship on it
                        angular.forEach(this.ships, function (ship) {
                            var positions = ship.getPositions();
                            angular.forEach(positions, function (position) {
                                var field = self.getField(position.x, position.y);
                                field.ship = ship;
                            });
                        });

                    },

                    /**
                     * guess
                     * The guess function checks the status of a field
                     * and returns its properties
                     * @param x
                     * @param y
                     * @returns guessResult
                     */
                    guess: function (x, y) {

                        // A prediction for the result is set
                        var result = {
                                hit: undefined,
                                destroyed: undefined,
                                status: 'opened',
                                positions: []
                            },

                        // The guessed field gets assigned
                            field = this.getField(x, y);

                        // If the field is already opened the
                        // guess gets aborted
                        if (field.status === 'opened') {
                            return;
                        }

                        // If a ship is placed on the field the ship status
                        // is assigned to the guess result
                        if (field.ship) {

                            // A possible hit is forced on the ship
                            result.hit = field.ship.hit(x, y);
                            result.destroyed = field.ship.isDestroyed();

                            // If the ship is destroyed all fields are updated
                            if (result.destroyed === true) {
                                result.status = 'destroyed ' + field.ship.direction;
                                angular.forEach(field.ship.getPositions(), function (position) {
                                    result.positions.push({ x: position.x, y: position.y });
                                });
                            } else {
                                // Otherwise the ship is just hit and not destroyed
                                result.status = 'hit';
                                result.positions.push({ x: x, y: y });
                            }
                        } else {
                            // Otherwise there is no ship on the field
                            result.positions.push({ x: x, y: y });
                        }

                        field.status = 'opened';

                        return result;
                    },

                    /**
                     * setGuessFieldStatus
                     * The setGuessFieldStatus sets the guessed status on the guessMap
                     * @param fieldset
                     */
                    setGuessFieldStatus: function (fieldset) {
                        var self = this;

                        // For each field in the position array the status gets updated
                        angular.forEach(fieldset.positions, function (position) {
                            var field = self.getField(position.x, position.y, self.guessFields);
                            field.status = fieldset.status;
                        });
                    }
                };
            }
        };
    });