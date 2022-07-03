const config = require('./config');
const express = require('express');
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const registerPlaylistHandlers = require("./playlistHandler");

app.use(cors());
app.use(express.json());

const httpServer = require("http").createServer();
const io = new Server(httpServer, {
    cors: {
        origin: `${config.app.schema}://${config.app.host}:${config.app.port}`,
        methods: ["GET", "POST"]            // TODO: POST required?
    }
});

// TODO: delete comment
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });


io.on('connection', (socket) => {
    console.log('a user connected on socket.id', socket.id);         // TODO: delete

    registerPlaylistHandlers(io, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected from socket.id', socket.id);   // TODO: delete
    });
});

httpServer.listen(config.server.port, () => {
    console.log(`Socket.io is listening on *:${config.server.port}`);
});