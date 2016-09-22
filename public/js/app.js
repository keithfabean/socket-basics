// app.js file
// this file is included in the index.html file
//
var socket = io();

socket.on('connect', function(){
    console.log('*** app.js *** - Connected to socket.io server!');
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    // add the moment timestamp (formatted) to the displayed message
    var timestampmoment = moment.utc(message.timestamp);
//    jQuery('.messages').append('<p>' + message.timestamp + '&emsp;'  + message.text + '</p>');
    jQuery('.messages').append('<p>' + timestampmoment.local().format('h:mm a') + ': &emsp;' + message.text + '</p>');
});

//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $form.find('input[name=message]').val()
    });

    // Clear the input message after it has been sent.
    // Using the alternate (simpler?) defined variable from above
    $message.val('');
});
