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

Plugins for the native functions on devices (not browser)
--------------------------------------------------------
# Remove plugins
cordova plugin remove org.apache.cordova.statusbar
cordova plugin remove de.neofonie.cordova.plugin.nativeaudio

# Add plugins
cordova plugin add org.apache.cordova.statusbar
cordova plugin add de.neofonie.cordova.plugin.nativeaudio