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
                    getPlayer: function(player) {
                        return this.player[player];
                    },
                    guess: function (x, y) {
                        this.player[ this.currentPlayer ].guess(x, y);

                        // If hit, guess again - else, switch player
                        //this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
                    }
                };
            }
        };
    });