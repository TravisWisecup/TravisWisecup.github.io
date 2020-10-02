var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = 3000;


app.use(express.static(path.join(__dirname, 'static')));


io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('join', function(msg){
    
    console.log("join request");
    socket.emit('joinaccept', '');
    
  });
  
  socket.on('disconnect', function(){
    console.log("disconnected");
  })
});


// Listen for requests
var server = http.listen(port, function() {
  console.log('listening on http://localhost:' + port);
});



var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.x < 0) {
      player.Obj.x -= 5;
    }
    if (data.y < 0) {
      player.Obj.y -= 5;
    }
    if (data.x > 0) {
      player.Obj.x += 5;
    }
    if (data.y > 0 ) {
      player.Obj.y += 5;
    }
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);
