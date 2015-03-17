angular.module('eendragt.engine.services.player', [])

    .factory('Player', function (Game, Config) {
        return {
            create: function () {
                var game;

                game = Game.start(Config.fields.x, Config.fields.y);
                game.placeShipsRandomly(Config.ships);

                return {
                    uid: Math.random().toString(9).substring(2, 12),
                    game: game,
                    guess: function (x, y) {
                        this.game.guess(x, y);
                    }
                };
            }
        };
    });