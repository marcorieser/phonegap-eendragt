/**
 * sound.js
 * This file includes the sound directive module of the eendragt application.
 * @author Marco Rieser
 * @version 8.0 */

angular.module('eendragt.engine.directives.sound', [])
    .directive('sound', function (Sound, Config) {
        return {
            'scope': {},
            'templateUrl': 'eendragt/engine/directives/sound.html',
            'restrict': 'E',
            link: function ($scope) {

                // Get an instance of the sound service
                var sound = Sound.initialize(),

                    /**
                     * playBackground
                     * The playBackground function starts the
                     * background playing in the sound service
                     */
                    playBackground = function () {
                        sound.playBackground();
                    },

                    /**
                     * stopBackground
                     * The stopBackground function stops the
                     * background playing in the sound service
                     */
                    stopBackground = function () {
                        sound.stopBackground();
                    };

                // Wait until the check endures if the sound is muted
                sound.isMute().then(function (status) {
                    $scope.muted = status;

                    /**
                     * toggleSound
                     * The toggleSound function toggles the background sound
                     */
                    $scope.toggleSound = function () {
                        var muted = $scope.muted ? false : true;

                        sound.setMute(muted);
                        $scope.muted = muted;

                        // Return if we are in the browser
                        if (Config.phonegap === false) {
                            return;
                        }

                        // Start or stop the background
                        if (muted === true) {
                            stopBackground();
                        } else {
                            playBackground();
                        }
                    };

                    if (Config.phonegap) {

                        // Wait until the device is ready
                        document.addEventListener('deviceready', function () {

                            // Initialize the background
                            sound.initializeBackground().then(function () {
                                if ($scope.muted === false) {
                                    playBackground();
                                }
                            });

                            // Initialize the other sounds
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
