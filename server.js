const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store users: { socketId: "Username" }
const users = {};

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // 1. Handle User Join
    socket.on('join', (username) => {
        users[socket.id] = username;
        // Broadcast to others that someone joined
        socket.broadcast.emit('system message', `${username} has joined Dinket`);
    });

    // 2. Handle Chat Messages
    socket.on('chat message', (msg) => {
        const username = users[socket.id] || 'Anonymous';
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Send object with text, user, and time
        io.emit('chat message', {
            user: username,
            text: msg,
            time: timestamp,
            id: socket.id // Send ID so client knows if it's their own message
        });
    });

    // 3. Handle Disconnect
    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            io.emit('system message', `${username} left the chat`);
            delete users[socket.id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Dinket Server running on port ${PORT}`);
});
