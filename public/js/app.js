
var socket = io();

socket.on('connect', function(){
    console.log('*** app.js *** - Connected to socket.io server!');
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    jQuery('.messages').append('<p>' + message.text + '</p>');
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
