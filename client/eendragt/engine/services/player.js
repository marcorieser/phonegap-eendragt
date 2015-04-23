/**
 * player.js
 * This file includes the player service module of the eendragt application.
 * @author Marco Rieser
 * @version 9.0 */

angular.module('eendragt.engine.services.player', [])

    .factory('Player', function (Game, Config) {
        return {
            /**
             * create
             * The create function initializes a player instance
             * @returns player instance
             */
            create: function () {
                var game,

                    /**
                     * startGame
                     * The startGame function initializes a new game service instance
                     */
                    startGame = function () {
                        game = Game.start(Config.fields.x, Config.fields.y);

                    },

                    /**
                     * placeShipsRandomly
                     * The placeShipsRandomly function places the ships randomized on the map
                     */
                    placeShipsRandomly = function () {
                        game.placeShipsRandomly(Config.ships);
                    };

                startGame();
                placeShipsRandomly();

                return {
                    uid: Math.random().toString(9).substring(2, 12),
                    game: game,
                    ships: Config.ships.length,

                    /**
                     * guess
                     * The guess function guesses a coordinate on the map
                     * @param x
                     * @param y
                     * @returns guessResult
                     */
                    guess: function (x, y) {

                        // Do a guess on the game
                        var guessResult = this.game.guess(x, y);

                        if (guessResult !== undefined && guessResult.destroyed === true) {
                            this.ships--;

                            // If no ships are left the player looses
                            //if (this.ships === 0) {
                            if (this.ships < Config.ships.length) {
                                guessResult.doomed = true;
                            }
                        }

                        return guessResult;
                    },

                    /**
                     * setGuessFieldStatus
                     * The setGuessFieldStatus function sets the field status on the guessMap
                     * @param guessResult
                     */
                    setGuessFieldStatus: function (guessResult) {
                        this.game.setGuessFieldStatus(guessResult);
                    },

                    /**
                     * placeShipsRandomly
                     * The placeShipsRandomly function places the ships randomized on the map
                     */
                    placeShipsRandomly: function () {
                        this.game.placeShipsRandomly(Config.ships);
                    }
                };
            }
        };
    });