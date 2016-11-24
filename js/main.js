'use strict';

var isInitiator;

window.room = prompt("Jake wants you to enter a room name:");

var socket = io.connect();

// Is anyone out there?
if(room != "") {
    console.log('Message from client: Let me in ' + room + '!');
    socket.emit('create or join', room);

}

socket.on('created', function(room, clientID) {
    isInitiator = true;

});

socket.on('full', function(room) {
    console.log('Message from client: ' + 'No room left for you in ' + room + ' ,pal');
});

socket.on('ipaddr', function(ipaddr) {
    console.log('MEssage from client: Server IP address is ' + ipaddr);

});

socket.on('joined', function(room, cientId) {
    isInitiator = false;
});

socket.on('log', function(array) {
    console.log.apply(console, array);
});