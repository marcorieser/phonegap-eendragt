angular.module('config', [])

    .factory('Config', function () {
        var config = {
            fields: {
                x: 5,
                y: 1
            },
            ships:  [
                { name: 'Terror', elements: 5 }/*,
                { name: 'Horror', elements: 4 },
                { name: 'McKinsey', elements: 3 },
                { name: 'Torpedo', elements: 2 },
                { name: 'Dropplet', elements: 2 }*/
            ]
        };

        return config;
    });