angular.module('eendragt.engine.services.config', [])

    .factory('Config', function () {
        return {
            fields: {
                x: 9,
                y: 9
            },
            ships: [
                { name: 'Horror', elements: 4 },
                { name: 'Horror', elements: 4 },
                { name: 'McKinsey', elements: 3 },
                { name: 'McKinsey', elements: 3 },
                { name: 'Dropplet', elements: 2 },
                { name: 'Dropplet', elements: 2 },
            ]
        };
    });