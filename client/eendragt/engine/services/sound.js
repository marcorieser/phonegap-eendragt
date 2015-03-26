angular.module('eendragt.engine.services.sound', [])

    .factory('Sound', function ($cordovaNativeAudio, $q, $localForage) {
        return {
            initialize: function () {
                var setMute = function(status) {
                    var deffered = $q.defer();

                    $localForage.setItem('mute', status).then(function () {
                        deffered.resolve();
                    });

                    return deffered.promise;
                };

                return {
                    isMute: function () {
                        var deffered = $q.defer();

                        $localForage.getItem('mute').then(function (status) {
                            if (status === undefined) {
                                status = false;
                                setMute(status);
                            }
                            deffered.resolve(status);
                        });

                        return deffered.promise;
                    },
                    setMute: function (status) {
                        var deffered = $q.defer();

                        setMute(status).then(function () {
                            deffered.resolve();
                        });

                        return deffered.promise;
                    },
                    initializeBackground: function () {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadComplex('game', 'assets/sounds/game.mp3', 0.3, 1)
                            .then(function () {
                            }, function () {
                                deffered.resolve();
                            });
                        return deffered.promise;
                    },
                    initializeHit: function () {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadSimple('hit', 'assets/sounds/hit.mp3')
                            .then(function () {
                                deffered.resolve();
                            }, function () {
                            });
                        return deffered.promise;
                    },
                    initializeSplash: function () {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadSimple('splash', 'assets/sounds/splash.mp3')
                            .then(function () {
                                deffered.resolve();
                            }, function () {
                            });
                        return deffered.promise;
                    },
                    initializeShot: function () {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadSimple('shot', 'assets/sounds/shot.mp3')
                            .then(function () {
                                deffered.resolve();
                            }, function () {
                            });
                        return deffered.promise;
                    },
                    playBackground: function () {
                        $cordovaNativeAudio.loop('game');
                    },
                    stopBackground: function () {
                        $cordovaNativeAudio.stop('game');
                    },
                    play: function (sound) {
                        $cordovaNativeAudio.play(sound);
                    }
                };
            }
        };
    });