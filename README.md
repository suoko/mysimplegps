mysimplegps
===========

The http://www.waleedkhan.com/simple-gps-app-with-phonegap/ tutorial has been followed to create this firefox os app.

cordova create mysimplegps

cordova platform add firefoxos

cordova prepare firefoxos

And then I copied index, code and arrow files from the website to www/...



To create the apk:
simpleGPS/platforms/firefoxos/www$ mozilla-apk-cli ./ ./simpleGPS.apk
