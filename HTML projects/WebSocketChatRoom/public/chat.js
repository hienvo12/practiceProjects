//Front end,
//edits the html
//make connection
var socket = io.connect('http://localhost:5000');

//query dom
var message = document.getElementById('message');
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback'),
  m1 = document.getElementById('m1');



var var1 = false;

//emit event
btn.addEventListener('click', ()=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
});

//io.in('connection').emit('t1', 'WE CAN SEE YOU');

//listen for events
socket.on('chat', (data) =>{
  feedback.innerHTML = '';
  output.innerHTML += '<p><Strong>' + data.handle + ': </Strong>' + data.message + '</p>';
});

socket.on('typing', (data) =>{
  feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';

socket.on('t1', (data)=>{
  feedback.innerHTML += " " + data;
});
});
