angular.module('eendragt.config.services.config', [])

    .factory('Config', function () {
        var config = {
            fields: {
                x: 9,
                y: 9
            },
            ships:  [
                { name: 'Terror', elements: 5 },
                { name: 'Horror', elements: 4 },
                { name: 'Horror', elements: 4 },
                { name: 'McKinsey', elements: 3 },
                { name: 'McKinsey', elements: 3 },
                { name: 'McKinsey', elements: 3 },
                { name: 'Dropplet', elements: 2 },
                { name: 'Dropplet', elements: 2 },
                { name: 'Dropplet', elements: 2 },
                { name: 'Dropplet', elements: 2 }
            ]
        };

        return config;
    });