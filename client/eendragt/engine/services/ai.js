angular.module('eendragt.engine.services.ai', [])

    .factory('AI', function (Game) {
        return {
            guess: function () {
                console.log(Game);
            }
        };
    });