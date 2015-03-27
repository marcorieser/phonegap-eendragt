angular.module('eendragt.engine.directives.sound', [])
    .directive('sound', function (Sound, Config) {
        return {
            'scope': {},
            'templateUrl': 'eendragt/engine/directives/sound.html',
            'restrict': 'E',
            link: function ($scope) {
                var sound = Sound.initialize(),
                    playBackground = function () {
                        sound.playBackground();
                    },
                    stopBackground = function () {
                        sound.stopBackground();
                    };

                sound.isMute().then(function (status) {
                    $scope.muted = status;

                    $scope.toggleSound = function () {
                        var muted = $scope.muted ? false : true;

                        sound.setMute(muted);
                        $scope.muted = muted;

                        if (Config.phonegap === false) {
                            return;
                        }

                        if (muted === true) {
                            stopBackground();
                        } else {
                            playBackground();
                        }
                    };

                    if (Config.phonegap) {

                        document.addEventListener('deviceready', function () {
                            sound.initializeBackground().then(function () {
                                if ($scope.muted === false) {
                                    playBackground();
                                }
                            });
                            sound.initialize('hit');
                            sound.initialize('splash');
                            sound.initialize('victory');
                            sound.initialize('doomed');
                        }, false);
                    }

                });
            }
        };
    });
