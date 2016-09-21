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
io.on('connection', function(){
    console.log('*** User connected via Socket-io');
});


//--------------------------------------------------------------------
// Start the server and listen on the appropriate port.

http.listen(PORT, function(){
    console.log('*** Server Started ***');
})
