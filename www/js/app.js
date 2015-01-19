var app = angular.module('Battleships', [ 'ngCordova' ]);

document.addEventListener("deviceready", function () {
    $cordovaPlugin.someFunction().then(success, error);
}, false);

app.controller('MyCtrl', function ($cordovaStatusbar) {
    $cordovaStatusbar.overlaysWebView(true);

    // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
    $cordovaStatusbar.style(1);

    // supported names: black, darkGray, lightGray, white, gray, red, green,
    // blue, cyan, yellow, magenta, orange, purple, brown
    $cordovaStatusbar.styleColor('black');

    $cordovaStatusbar.styleHex('#000');

    $cordovaStatusbar.hide();

    $cordovaStatusbar.show();

    var isVisible = $cordovaStatusbar.isVisible();

});