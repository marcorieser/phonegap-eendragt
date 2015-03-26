angular.module('eendragt.engine.directives.sound', [])
    .directive('sound', function (Sound, Config) {
        return {
            'scope': {},
            'templateUrl': 'eendragt/engine/directives/sound.html',
            'restrict': 'E',
            link: function ($scope) {
                var playBackground = function () {
                        Sound.playBackground();
                    },
                    stopBackground = function () {
                        //Sound.stopBackground();
                    };

                $scope.muted = false;
                $scope.toggleSound = function () {
                    var muted = $scope.muted ? false : true;
                    $scope.muted = muted;

                    if (muted === true) {
                        stopBackground();
                    } else {
                        playBackground();
                    }
                };

                if (Config.phonegap === true) {

                    document.addEventListener('deviceready', function () {
                        Sound.initializeBackground().then(function () {
                            if ($scope.muted === false) {
                                playBackground();
                            }
                        });
                        Sound.initializeHit();
                        Sound.initializeShot();
                        Sound.initializeSplash();
                    }, false);
                }
            }
        };
    });
