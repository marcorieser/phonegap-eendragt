phonegap-eendragt
====================

Installation
------------
npm install -g grunt-cli bower

cd config

npm install

bower install

Commands
--------
# Development

grunt watch

# Production

grunt

Usage in Browser
----------------
- set phonegap to false in the config service
- comment the cordova.js in the main index.html


Plugins for the native functions on devices (not browser)
--------------------------------------------------------
# Remove plugins
cordova plugin remove org.apache.cordova.statusbar
cordova plugin remove de.neofonie.cordova.plugin.nativeaudio

# Add plugins
cordova plugin add org.apache.cordova.statusbar
cordova plugin add de.neofonie.cordova.plugin.nativeaudio