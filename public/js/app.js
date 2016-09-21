
var socket = io();

socket.on('connect', function(){
    console.log('*** app.js *** - Connected to socket.io server!');
});
