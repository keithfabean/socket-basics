var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// listen for the socket-io on connection event
//--------------------------------------------------------------------
io.on('connection', function(socket){
    console.log('*** server.js *** - User connected via Socket-io');

    socket.on('message', function(message){
        console.log('Message Received: ' + message.text);
        // io.emit  would broadcast the message to everyone including the person that sent the message.
        // socket.broadcast.emit  would broadcast the message to everyone EXCEPT the person that sent the message.
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application.'
    });
});


//--------------------------------------------------------------------
// Start the server and listen on the appropriate port.

http.listen(PORT, function(){
    console.log('*** Server Started ***');
})
