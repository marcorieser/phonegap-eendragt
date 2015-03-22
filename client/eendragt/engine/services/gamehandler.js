angular.module('eendragt.engine.services.gamehandler', [])

    .factory('GameHandler', function (Player) {
        return {
            getInstance: function (startPlayer) {
                var getPlayer = function () {
                    return Player.create();
                };

                startPlayer = startPlayer || 0;

                return {
                    player: [
                        getPlayer(),
                        getPlayer()
                    ],
                    currentPlayer: startPlayer,
                    getPlayer: function (player) {
                        return this.player[ player ];
                    },
                    guess: function (x, y) {
                        var current = this.currentPlayer,
                            other = current === 0 ? 1 : 0,
                            guessResult = this.player[ current ].guess(x, y);
                        if (guessResult === undefined) {
                            return;
                        }

                        this.player[ current ].setGuessFieldStatus(guessResult);

                        if (guessResult.hit !== undefined) {
                            return;
                        }

                        //this.currentPlayer = other;
                    },
                    placeShipsRandomly: function () {
                        this.player[0 ].placeShipsRandomly();
                    }
                };
            }
        };
    });