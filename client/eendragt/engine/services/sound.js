/**
 * sound.js
 * This file includes the sound service module of the eendragt application.
 * @author Marco Rieser
 * @version 5.0 */

 angular.module('eendragt.engine.services.sound', [])

    .factory('Sound', function ($cordovaNativeAudio, $q, $localForage) {
        return {
            /**
             * initialize
             * The initialize function instantiates the sound service
             * @returns sound instance
             */
            initialize: function () {

                /**
                 * setMute
                 * The setMute function sets the mute status to the localStorage
                 * @param status
                 * @returns promise
                 */
                var setMute = function (status) {
                    var deffered = $q.defer();

                    $localForage.setItem('mute', status).then(function () {
                        deffered.resolve();
                    });

                    return deffered.promise;
                };

                return {

                    /**
                     * isMute
                     * The isMute function checks if the game is muted
                     * @returns promise
                     */
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

                    /**
                     * setMute
                     * The setMute function sets the mute status to the localStorage
                     * @param status
                     * @returns promise
                     */
                    setMute: function (status) {
                        var deffered = $q.defer();

                        setMute(status).then(function () {
                            deffered.resolve();
                        });

                        return deffered.promise;
                    },

                    /**
                     * initializeBackground
                     * The initializeBackground preloads the background sound
                     * @returns promise
                     */
                    initializeBackground: function () {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadComplex('game', 'assets/sounds/game.mp3', 0.1, 1)
                            .then(function () {
                            }, function () {
                                deffered.resolve();
                            });
                        return deffered.promise;
                    },

                    /**
                     * initialize
                     * The initialize preloads a simple sound file
                     * @param sound
                     * @returns promise
                     */
                    initialize: function (sound) {
                        var deffered = $q.defer();
                        $cordovaNativeAudio
                            .preloadSimple(sound, 'assets/sounds/' + sound + '.mp3')
                            .then(function () {
                                deffered.resolve();
                            }, function () {
                            });
                        return deffered.promise;
                    },

                    /**
                     * playBackground
                     * The playBackground function plays the background sound
                     */
                    playBackground: function () {
                        $cordovaNativeAudio.loop('game');
                    },

                    /**
                     * stopBackground
                     * The stopBackground function stops the background sound
                     */
                    stopBackground: function () {
                        $cordovaNativeAudio.stop('game');
                    },

                    /**
                     * play
                     * The play function plays a simple preloaded sound
                     * @param sound
                     */
                    play: function (sound) {
                        $cordovaNativeAudio.play(sound);
                    }
                };
            }
        };
    });