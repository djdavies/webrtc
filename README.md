# WebRTC and Socket.io
Merely a play around with WebRTC (JavaScript APIs), Socket.io and Node.js

## Get:
* Chrome
* web server or [web server for chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
    * If using Web Server For Chrome, set 'work' as the dir and auto. show index.html

## Using / interesting:
* getVideo (very oldskool one)
        * uses callback version of `getUserMedia()` (compatible for current browsers)
        * other code uses promised-based MediaDevices API
    * Open `index.html`
        * check out `stream` in dev console -- it's in global scope!
        * check out what `stream.getVideoTracks()` returns
        * call `stream.getVideoTracks()[0].stop()`
        * change the properties of the constraints object to:
        ```javascript
        var constraints = {
          audio: true,
          video: true
        };
        ```
    * can change the size of the video element, get **natural** size from js (_not_ display size)
        * can add CSS filters
        ```css
        video {
          -webkit-filter: blur(7px) invert(1) opacity(0.9);
        }
        ```
        * or SVG filters
        ```css
        video {
           filter: hue-rotate(90deg) saturate(250%);
           -webkit-filter: hue-rotate(97deg) saturate(50%);
         }
        ```
    
* streamVideo (uses RTCPeerConnection)
    * pro-tip: [webrtc-internals](chrome://webrtc-internals)
    * look at `localStream`, `pc1`, `pc2 `in dev tools console `(cmd + alt + j)`
    * & `pc1.localDescription`

* messagingService (uses socket.io)
    * `npm install`
    * `node index.js`
    * open `localhost:8080`
    * x2 tabs, same room name, + web dev console. See the logging?
        * **TODO: get room name from URL. `localhost:8080/team13 ` --> room name = 'team13'** 
        * **TODO: change design to enable >1 person to share same video chat room**
        * **TODO: change hard-corded room name**
        
* photoShareDataChannel
    * `node index.js`
    * x2 tabs
    * click snap & send
        * look at incoming area in tab
            * **TODO: share _any_ file type**