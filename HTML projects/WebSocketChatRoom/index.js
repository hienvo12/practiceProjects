//backend
//sets up the connection
var express = require('express');
var socket = require('socket.io');
//app setup
var app = express();
var server = app.listen(5000, ()=>{
  console.log("listening to requests on port 5000...");
});
//static files
app.use(express.static('public'));
//socket setup
var io = socket(server);

io.on('connection', (socket)=>{
  console.log("socket connection made...", socket.id);

  socket.on('chat',(data) =>{
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) =>{
    socket.broadcast.emit('typing', data);
  });

  socket.on('t1', (data) =>{
    io.sockets.emit('t1', data);
  }); 


});
