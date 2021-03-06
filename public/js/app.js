// app.js file
// this file is included in the index.html file
//
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

//update the h1 tag in chat.html
$(".room-title").text('Chat Room: ' + room);

var socket = io();

console.log(name + ' has joined ' + room);

socket.on('connect', function(){
    console.log('*** app.js *** - Connected to socket.io server!');
    socket.emit('joinroom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    // add the moment timestamp (formatted) to the displayed message
    var timestampmoment = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');


    $message.append('<p><strong>' + message.name + ' ' + timestampmoment.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
//    jQuery('.messages').append('<p>' + timestampmoment.local().format('h:mm a') + ': &emsp;' + message.text + '</p>');
});

// Handles the event from the browser that submits a new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $form.find('input[name=message]').val()
    });

    // Clear the input message after it has been sent.
    // Using the alternate (simpler?) defined variable from above
    $message.val('');
});
