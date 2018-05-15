var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user has connected');
    socket.broadcast.emit('chat message', 'a user has connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
        socket.broadcast.emit('chat message', 'a user has disconnected');
    })

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })

    // Need to see if this actually works.
    socket.on('user typing', function(msg){
        console.log('A user is typing ' + msg);
        io.emit('user typing', 'A user is typing');
    })

    
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});