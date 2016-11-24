'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new(nodeStatic.Server)();
var app = http.createServer(function(req, res) {
    fileServer.serve(req, res);
}).listen(8080);

var io = socketIO.listen(app);
io.sockets.on('connection', function(socket) {

    // a convenient function that logs server messages on the client
    function log() {
        var array = ['MEssagge from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('meesage', function (message) {
        log('the client said: ' message);

        // in reality would be room-only (no broadcasting)
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', function (room) {
        log('Got a request to create or join room' + room);

        var numClients = io.sockets.sockets.length;
        log('Room' + room + ' has now got ' + numClients + ' client(s)');

        if (numClients == 1) {
            socket.join(room);
            log('Client ID ' + socket.id + ' created the room: ' + room);
            socket.emit('created', room, socket.id);
        } else if (numClients == 2) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
        // Only 2 clients right now.
        } else {
            socket.emit('room is full!', room);
        }
    });

    socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if (details.family == 'IPv4' && details.address != '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });
})
