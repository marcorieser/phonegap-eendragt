angular.module('eendragt.engine.services.gamehandler', [])

    .factory('GameHandler', function (Player, $rootScope, $location, AI, $timeout, Sound, Config) {
        return {
            getInstance: function (startPlayer) {
                var sound = Sound.initialize(),
                    ai = AI.create();
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
                    getPlayer: function (player) {
                        return this.player[ player ];
                    },
                    guess: function (x, y) {
                        var self = this,
                            current = this.currentPlayer,
                            other = current === 0 ? 1 : 0,
                            guessResult = this.player[ other ].guess(x, y);

                        if (guessResult === undefined) {
                            ai.broadcast('alreadyGuessed', {
                                status: guessResult,
                                x: x,
                                y: y
                            });

                            return;
                        }

                        this.player[ current ].setGuessFieldStatus(guessResult);

                        if (guessResult.doomed !== undefined && guessResult.doomed === true) {
                            this.end(current);
                            return;
                        }

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
                        if (Config.phonegap) {
                            sound.play('splash');
                        }
                        $timeout(function () {
                            self.currentPlayer = other;

                            ai.broadcast('userChanged', {
                                status: guessResult,
                                x: x,
                                y: y
                            });
                        }, 1200);
                    },

                    placeShipsRandomly: function () {
                        this.player[ 0 ].placeShipsRandomly();
                    },

                    end: function (player) {
                        if (player === 0) {
                            if (Config.phonegap) {
                                sound.play('victory');
                            }
                            $location.path('game/victory');

                            return;
                        }
                        if (Config.phonegap) {
                            sound.play('doomed');
                        }
                        $location.path('game/doomed');
                    }
                };
            }
        };
    });