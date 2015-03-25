angular.module('eendragt.engine.services.ai', [])

    .factory('AI', function ($rootScope, $timeout, Config) {
        return {
            create: function () {
                var length = Config.fields.x,
                    height = Config.fields.y,
                    directions = [ 'h+', 'h-', 'v+', 'v-' ],
                    direction = 0,
                    lastHit,
                    fieldCounter = 0,
                    neighbours = [],

                    resetNeighbours = function () {
                        neighbours = [];
                        fieldCounter = 0;
                    },

                    getNeighbours = function () {
                        var field,
                            i;
                        resetNeighbours();

                        for (i = 0; i < directions.length; i++) {
                            field = getStrategicField();

                            if (field !== false) {
                                neighbours.push(field);
                            }
                            direction = direction < directions.length ? direction + 1 : 0;
                        }
                    },

                    getStrategicField = function () {
                        var x = lastHit.x,
                            y = lastHit.y;

                        switch (direction) {
                            case 0:
                                if (x + 1 < length) {
                                    x++;
                                }
                                break;
                            case 1:
                                if (x > 0) {
                                    x--;
                                }
                                break;
                            case 2:
                                if (y + 1 < height) {
                                    y++;
                                }
                                break;
                            case 3:
                                if (y > 0) {
                                    y--;
                                }
                                break;
                        }
                        return { x: x, y: y };
                    },

                    getRandomField = function () {
                        var x = (~~(Math.random() * length)),
                            y = (~~(Math.random() * height));

                        return { x: x, y: y };
                    },
                    guess = function () {
                        var field,
                            x, y;
                        if (fieldCounter < neighbours.length) {
                            field = neighbours[ fieldCounter ];
                            fieldCounter++;
                            direction = direction < directions.length ? direction + 1 : 0;
                        } else {
                            field = getRandomField();
                        }
                        x = field.x;
                        y = field.y;

                        $rootScope.gameHandler.guess(x, y);
                    },
                    checkPlayer = function (event, args) {
                        if ($rootScope.gameHandler.currentPlayer !== 1) {
                            return;
                        }

                        if (event.name === 'alreadyGuessed') {
                            guess();
                            return;
                        }

                        if (args.status !== undefined) {
                            if (args.status.destroyed === true) {
                                lastHit = undefined;
                                resetNeighbours();
                            } else if (args.status.hit === true) {
                                lastHit = { x: args.x, y: args.y };
                                getNeighbours();
                            }
                        }
                        $timeout(function () {
                            guess();
                        }, 700);
                    };

                $rootScope.$on('userChanged', function (event, args) {
                    checkPlayer(event, args);
                });

                $rootScope.$on('alreadyGuessed', function (event, args) {
                    checkPlayer(event, args);
                });
                $rootScope.$on('hit', function (event, args) {
                    checkPlayer(event, args);
                });
            }
        };
    });