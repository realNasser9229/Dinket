const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS allowed for Render
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, 'public')));

const users = {};

io.on('connection', (socket) => {
    // When a user joins
    socket.on('join', (username) => {
        users[socket.id] = username;
        // Notify others
        socket.broadcast.emit('system message', `${username} joined the lounge`);
    });

    // When a message is sent
    socket.on('chat message', (msg) => {
        const payload = {
            user: users[socket.id] || 'Guest',
            text: msg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            id: socket.id
        };
        // Send to EVERYONE
        io.emit('chat message', payload);
    });

    socket.on('disconnect', () => {
        if (users[socket.id]) {
            io.emit('system message', `${users[socket.id]} left Dinket`);
            delete users[socket.id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Dinket is live on port ${PORT}`);
});
