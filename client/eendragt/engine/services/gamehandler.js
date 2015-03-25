angular.module('eendragt.engine.services.gamehandler', [])

    .factory('GameHandler', function (Player, $rootScope, $location, AI, $timeout) {
        return {
            getInstance: function (startPlayer) {
                var getPlayer = function () {
                    var player = angular.copy(Player);
                    return player.create();
                };

                startPlayer = startPlayer || 0;

                AI.create();

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
                            $rootScope.$broadcast('alreadyGuessed', {
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
                            $rootScope.$broadcast('hit', {
                                status: guessResult,
                                x: x,
                                y: y
                            });
                            return;
                        }
                        $timeout(function () {
                            self.currentPlayer = other;

                            $rootScope.$broadcast('userChanged', {
                                status: guessResult,
                                x: x,
                                y: y
                            });
                        }, 1000);
                    },

                    placeShipsRandomly: function () {
                        this.player[ 0 ].placeShipsRandomly();
                    },

                    end: function (player) {
                        if (player === 0) {
                            $location.path('game/victory');

                            return;
                        }

                        $location.path('game/doomed');
                    }
                };
            }
        };
    });