/**
 * gamehandler.js
 * This file includes the gamehandler service module of the eendragt application.
 * @author Marco Rieser
 * @version 22.0 */

angular.module('eendragt.engine.services.gamehandler', [])

    .factory('GameHandler', function (Player, $rootScope, $location, AI, $timeout, Sound, Config) {
        return {
            /**
             * getInstance
             * The getInstance function creates a new instance of the gamehandler service
             * @param startPlayer
             * @returns gamehandler instance
             */
            getInstance: function (startPlayer) {
                var sound = Sound.initialize(),

                // Create an instance of the ai service
                    ai = AI.create();

                /**
                 * getPlayer
                 * The getPlayer function creates a new instance of the player service
                 * @returns player clone instance
                 */
                getPlayer = function () {
                    var player = angular.copy(Player);
                    return player.create();
                };

                startPlayer = startPlayer || 0;

                return {
                    player: [
                        getPlayer(),
                        getPlayer()
                    ],
                    currentPlayer: startPlayer,

                    /**
                     * getPlayer
                     * The getPlayer function returns a player
                     * @param player
                     * @returns player
                     */
                    getPlayer: function (player) {
                        return this.player[ player ];
                    },

                    /**
                     * guess
                     * The guess function does a guess on the player
                     * @param x
                     * @param y
                     */
                    guess: function (x, y) {
                        var self = this,
                            current = this.currentPlayer,
                            other = current === 0 ? 1 : 0,
                            guessResult = this.player[ other ].guess(x, y);

                        // If the guessResult is undefined the field was already guessed before
                        if (guessResult === undefined) {

                            // Broadcast the ai service
                            ai.broadcast('alreadyGuessed', {
                                status: guessResult,
                                x: x,
                                y: y
                            });

                            return;
                        }

                        this.player[ current ].setGuessFieldStatus(guessResult);

                        // If the player looses the game ends
                        if (guessResult.doomed !== undefined && guessResult.doomed === true) {
                            this.end(current);
                            return;
                        }

                        // If the guessResult is hit broadcast the ai service and play the sound for a hit
                        if (guessResult.hit !== undefined) {
                            if (Config.phonegap) {
                                sound.play('hit');
                            }
                            ai.broadcast('hit', {
                                status: guessResult,
                                x: x,
                                y: y
                            });
                            return;
                        }

                        // Play the splash sound if we are not in the browser
                        if (Config.phonegap) {
                            sound.play('splash');
                        }

                        // Simulate a human with a timeout
                        $timeout(function () {
                            self.currentPlayer = other;

                            // Broadcast the ai that the user changed
                            ai.broadcast('userChanged', {
                                status: guessResult,
                                x: x,
                                y: y
                            });
                        }, 1200);
                    },

                    /**
                     * placeShipsRandomly
                     * The placeShipsRandomly function places the ships randomized on the map
                     */
                    placeShipsRandomly: function () {
                        this.player[ 0 ].placeShipsRandomly();
                    },

                    /**
                     * end
                     * The end function closes the game
                     * @param player
                     */
                    end: function (player) {
                        if (player === 0) {
                            if (Config.phonegap) {
                                sound.play('victory');
                            }

                            // Browse to the victory page
                            $location.path('game/victory');

                            return;
                        }
                        if (Config.phonegap) {
                            sound.play('doomed');
                        }

                        // Browse to the doomed page
                        $location.path('game/doomed');
                    }
                };
            }
        };
    });