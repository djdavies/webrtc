# WebRTC and Socket.io
Merely a play around with WebRTC and Socket.io

## Get:
* Chrome
* web server or [web server for chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
    * If using Web Server For Chrome, set 'work' as the dir and auto. show index.html

## Using:
* getVideo (very oldskool one)
    * Open index.html

* streamVideo (uses RTCPeerConnection)
    * protip: [webrtc-internals](chrome://webrtc-internals)
    * look at localStream, pc1, pc2 in dev tools console (cmd + alt + j)
    * pc1.localDescription

* messagingService (uses socket.io)
    * npm install
    * node index.js
    * localhost:8080
    * x2 tabs, same room name, + web dev console. See the logging?

* photoShareDataChannel
    * node index.js
    * x2 tabs
    * click snap & send
        * look at incoming area in tab