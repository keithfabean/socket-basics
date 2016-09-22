var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();


app.use(express.static(__dirname + '/public'));

var clientInfo = {};
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// listen for the socket-io on connection event
//--------------------------------------------------------------------
io.on('connection', function(socket){
    console.log('*** server.js *** - User connected via Socket-io');
    console.log(now.valueOf());

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
        // io.emit  would broadcast the message to everyone including the person that sent the message.
        // socket.broadcast.emit  would broadcast the message to everyone EXCEPT the person that sent the message.
        //io.emit('message', message);
        //This changes the emit so it only sends the message to the right room for the user
        // |----------------------------|
        io.to(clientInfo[socket.id].room).emit('message', message);
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
