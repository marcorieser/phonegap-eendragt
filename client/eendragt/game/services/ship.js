/**
 * ship.js
 * This file includes the ship service module of the eendragt application.
 * @author Marco Rieser
 * @version 15.0 */

angular.module('eendragt.game.services.ship', [])
    // A new factory gets defined
    .factory('Ship', function () {
        return {

            /**
             * create
             * The create function instantiates a new ship
             * @param x
             * @param y
             * @param elements
             * @param direction
             * @param name
             * @returns Ship instance
             */
            create: function (x, y, elements, direction, name) {
                var positions = [],

                    /**
                     * setPositions
                     * The setPositions function creates a positions array
                     * based on the amount of elements
                     * @returns positions
                     */
                    setPositions = function () {
                        var positions = [];

                        // Each element gets pushed into the positions array
                        for (var i = 0; i < elements; i++) {
                            if (direction === 'h') {
                                positions.push({ id: i, x: x + i, y: y, hit: false });
                            } else {
                                positions.push({ id: i, x: x, y: y + i, hit: false });
                            }
                        }
                        return positions;
                    };

                // The properties get defined
                x = window.parseInt(x, 10);
                y = window.parseInt(y, 10);
                elements = window.parseInt(elements, 10);

                positions = setPositions();

                // This are the public methods and properties
                return {
                    name: name,
                    direction: direction,
                    destroyed: false,

                    /**
                     * getPositions
                     * The getPositions function returns the ship positions
                     * @returns positions
                     */
                    getPositions: function () {
                        return positions;
                    },

                    /**
                     * getPosition
                     * The getPosition function returns a specific position
                     * @param x
                     * @param y
                     * @returns position
                     */
                    getPosition: function (x, y) {
                        var value;

                        angular.forEach(positions, function (position) {

                            // Return if value not undefined
                            if (value !== undefined) {
                                return;
                            }

                            // Return if the x coordinate is not the same as the position x
                            if (window.parseInt(position.x, 10) !== window.parseInt(x, 10)) {
                                return;
                            }

                            // Return if the y coordinate is not the same as the position y
                            if (window.parseInt(position.y, 10) !== window.parseInt(y, 10)) {
                                return;
                            }

                            value = position;
                        });

                        return value;
                    },

                    /**
                     * isDestroyed
                     * The isDestroyed function checks if the ship is destroyed
                     * @returns boolean
                     */
                    isDestroyed: function () {
                        var destroyed = true;

                        angular.forEach(positions, function (position) {

                            // Return if one position was not destroyed
                            if (destroyed === false) {
                                return;
                            }

                            // Return if this position is not hit
                            if (position.hit === false) {
                                destroyed = false;
                            }
                        });

                        this.destroyed = destroyed;

                        return destroyed;
                    },

                    /**
                     * hit
                     * The hit function checks if one position is hit
                     * @param x
                     * @param y
                     * @returns boolean
                     */
                    hit: function (x, y) {
                        var position = this.getPosition(x, y),
                            hit = false;
                        if (position !== undefined) {
                            position.hit = true;
                            hit = true;
                        }
                        return hit;
                    }
                };
            }
        };
    });
