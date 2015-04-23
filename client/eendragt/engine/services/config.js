/**
* config.js
* This file includes the config service module of the eendragt application.
* @author Marco Rieser
* @version 3.0 */

angular.module('eendragt.engine.services.config', [])

    .factory('Config', function () {
        return {
            fields: {
                x: 9,
                y: 9
            },
            ships: [
                { name: 'master4', elements: 4 },
                { name: 'master3', elements: 3 },
                { name: 'master3', elements: 3 },
                { name: 'master2', elements: 2 },
                { name: 'master2', elements: 2 },
                { name: 'master2', elements: 2 }
            ],
            phonegap: false
        };
    });