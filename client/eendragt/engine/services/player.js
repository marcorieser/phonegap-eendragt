angular.module('eendragt.engine.services.player', [])

    .factory('Player', function (Game, Config) {
        return {
            create: function () {
                var game,
                    startGame = function () {
                        game = Game.start(Config.fields.x, Config.fields.y);

                    },
                    placeShipsRandomly = function () {
                        game.placeShipsRandomly(Config.ships);
                    };

                startGame();
                placeShipsRandomly();

                return {
                    uid: Math.random().toString(9).substring(2, 12),
                    game: game,
                    ships: Config.ships.length,
                    guess: function (x, y) {
                        var guessResult = this.game.guess(x, y);

                        if (guessResult !== undefined && guessResult.destroyed === true) {
                            this.ships--;
                            if (this.ships === 0) {
                                guessResult.doomed = true;
                            }
                        }

                        return guessResult;
                    },
                    setGuessFieldStatus: function (guessResult) {
                        this.game.setGuessFieldStatus(guessResult);
                    },
                    placeShipsRandomly: function () {
                        this.game.placeShipsRandomly(Config.ships);
                    }
                };
            }
        };
    });