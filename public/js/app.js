
var socket = io();

socket.on('connect', function(){
    console.log('*** app.js *** - Connected to socket.io server!');
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
});
