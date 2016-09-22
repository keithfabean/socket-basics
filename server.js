var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();


app.use(express.static(__dirname + '/public'));
//--------------------------------------------------------------------

var clientInfo = {};

//--------------------------------------------------------------------

//sends current users to the provided socket
function sendCurrentUsers(socket){
    var info = clientInfo[socket.id];
    users = [];

    if (typeof info === 'undefined'){
        return;
    }
    Object.keys(clientInfo).forEach(function(socketId){
        var userInfo = clientInfo[socketId];
        if (info.room === userInfo.room){
            users.push(userInfo.name);
        }
    });

    socket.emit('message', {
        name: 'System',
        text: 'Current Users: ' + users.join(', '),
        timestamp: now.valueOf()
    });
}

//--------------------------------------------------------------------

//--------------------------------------------------------------------
// listen for the socket-io on connection event
//--------------------------------------------------------------------
io.on('connection', function(socket){
    console.log('*** server.js *** - User connected via Socket-io');

    socket.on('disconnect', function(){
        //set the clientInfo object to the request object.
        //And let socket generate a unique id for the person joining the chat.
        if (typeof clientInfo[socket.id] !== 'undefined'){
            socket.leave(clientInfo[socket.id].room);
            io.to(clientInfo[socket.id].room).emit('message', {
                name: 'System',
                text: clientInfo[socket.id].name + ' has left the Chat.',
                timestamp: now.valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('joinroom', function(req){
        //set the clientInfo object to the request object.
        //And let socket generate a unique id for the person joining the chat.
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined the Chat.',
            timestamp: now.valueOf()
        });
    });

    socket.on('message', function(message){
        console.log('Message Received: ' + message.text);

        // look for a special message @currentUsers
        if (message.text === '@currentUsers'){
            sendCurrentUsers(socket);
        } else {
            // io.emit  would broadcast the message to everyone including the person that sent the message.
            // socket.broadcast.emit  would broadcast the message to everyone EXCEPT the person that sent the message.
            //io.emit('message', message);
            //This changes the emit so it only sends the message to the right room for the user
            // |----------------------------|
            io.to(clientInfo[socket.id].room).emit('message', message);
        }

    });

    // Send an initial message to the participant when the enter the chat app
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application.',
        timestamp: now.valueOf()
    });
});


//--------------------------------------------------------------------
// Start the server and listen on the appropriate port.

http.listen(PORT, function(){
    console.log('*** Server Started ***');
})
