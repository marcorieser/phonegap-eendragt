/**
 * ai.js
 * This file includes the ai service module of the eendragt application.
 * @author Marco Rieser
 * @version 15.0 */

angular.module('eendragt.engine.services.ai', [])

    .factory('AI', function ($rootScope, $timeout, Config) {
        return {
            /**
             * create
             * The create function initializes a new ai instance
             * @returns ai instance
             */
            create: function () {
                var length = Config.fields.x,
                    height = Config.fields.y,
                    directions = [ 'h+', 'h-', 'v+', 'v-' ],
                    direction = 0,
                    lastHit,
                    fieldCounter = 0,
                    neighbours = [],

                    /**
                     * resetNeighbours
                     * The resetNeighbours cleans up the neighbours variable
                     */
                    resetNeighbours = function () {
                        neighbours = [];
                        fieldCounter = 0;
                    },

                    /**
                     * getNeighbours
                     * The getNeigbhours function fills an array with
                     * the neighbour fields of the successfully hit field
                     */
                    getNeighbours = function () {
                        var field,
                            i;
                        resetNeighbours();

                        for (i = 0; i < directions.length; i++) {
                            field = getStrategicField();

                            if (field !== false) {
                                neighbours.push(field);
                            }

                            // Change direction
                            direction = direction < directions.length ? direction + 1 : 0;
                        }
                    },

                    /**
                     * getStrategicField
                     * The getStrategicField function gets the strategic field around the hit field
                     * @returns position
                     */
                    getStrategicField = function () {
                        var x = lastHit.x,
                            y = lastHit.y;

                        switch (direction) {
                            case 0:
                                if (x + 1 < length) {
                                    x++;
                                }
                                break;
                            case 1:
                                if (x > 0) {
                                    x--;
                                }
                                break;
                            case 2:
                                if (y + 1 < height) {
                                    y++;
                                }
                                break;
                            case 3:
                                if (y > 0) {
                                    y--;
                                }
                                break;
                        }
                        return { x: x, y: y };
                    },

                    /**
                     * getRandomField
                     * The getRandomField function returns a random coordinate field position on the map
                     * @returns position
                     */
                    getRandomField = function () {
                        var x = (~~(Math.random() * length)),
                            y = (~~(Math.random() * height));

                        return { x: x, y: y };
                    },

                    /**
                     * guess
                     * The guess function guesses on the gamehandler service
                     */
                    guess = function () {
                        var field,
                            x, y;

                        // If neighbour fields available chose one of them
                        if (fieldCounter < neighbours.length) {
                            field = neighbours[ fieldCounter ];
                            fieldCounter++;
                            direction = direction < directions.length ? direction + 1 : 0;
                        } else {
                            // otherwise get a random field
                            field = getRandomField();
                        }
                        x = field.x;
                        y = field.y;

                        // guess on the gamehandler service
                        $rootScope.gameHandler.guess(x, y);
                    },

                    /**
                     * checkPlayer
                     * The checkPlayer function checks the player state
                     * @param event
                     * @param args
                     */
                    checkPlayer = function (event, args) {
                        // Return if human player
                        if ($rootScope.gameHandler.currentPlayer !== 1) {
                            return;
                        }

                        // If the field was already guessed guess without timeout
                        if (event.name === 'alreadyGuessed') {
                            guess();
                            return;
                        }

                        if (args.status !== undefined) {
                            if (args.status.destroyed === true) {
                                lastHit = undefined;
                                resetNeighbours();
                            } else if (args.status.hit === true) {
                                lastHit = { x: args.x, y: args.y };
                                getNeighbours();
                            }
                        }

                        // Guess with timeout to simulate human player
                        $timeout(function () {
                            guess();
                        }, 1200);
                    };

                return {

                    /**
                     * broadcast
                     * The broadcast function is an alternative to the event broadcasting on the rootScope.
                     * We implemented this function because we run into event listener problems when we restarted
                     * a game after one was finished.
                     * @param event
                     * @param args
                     */
                    broadcast: function (event, args) {
                        checkPlayer(event, args);
                    }
                };
            }
        };
    });