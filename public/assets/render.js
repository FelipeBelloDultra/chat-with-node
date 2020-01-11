var socket = io('http://localhost:3000');

function renderMessages(message) {
  $('.messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>')
};

socket.on('previousMessage', function (messages) {
  for (showPreviousMessage of messages) {
    renderMessages(showPreviousMessage);
  }
})

socket.on('receiveMessage', function (message) {
  renderMessages(message)
});

$('#chat').submit(function (event) {
  event.preventDefault();

  var author = $('input[name=username]').val();
  var message = $('input[name=message]').val();

  if (author.length && message.lenght != '') {
    var messageObject = {
      author: author,
      message: message,
    };

    renderMessages(messageObject);

    socket.emit('sendMessage', messageObject);
  } else {
    alert('Informe uma mensagem!');
  }

  message = $('input[name=message]').val('');
});
