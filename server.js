const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

app.use(express.static('./frontend'));
app.use('/frontend/scripts', express.static('scripts'))

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let rooms = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', ({message, room}) => {
        console.log('Incoming message: ' + message + " From: " + room);
        io.sockets.in(room).emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });

    socket.on('create', (room) => {
        console.log(`SALA ${room} creada`);
        socket.join(room);
    });


});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/frontend/views/chat.html"));
});

app.get('/:room', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/frontend/views/room.html"));
});

http.listen(3000, () => console.log('listening on http://localhost:3000') );

// ----------- Alternate functions ----------------