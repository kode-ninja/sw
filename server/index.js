require('dotenv').config();
const config = require('./config');
const express = require('express');
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const registerPlaylistHandlers = require("./playlistHandler");

app.use(cors());

const server = require("http").createServer();
const io = new Server(server, {
    cors: {
        origin: `${config.app.schema}://${config.app.host}:${config.app.port}`,
    }
});

io.on('connection', (socket) => {
    console.log('a user connected on socket.id', socket.id);         // TODO: delete

    registerPlaylistHandlers(io, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected from socket.id', socket.id);   // TODO: delete
    });
});

server.listen(config.server.port, () => {
    console.log(`Socket.io is listening on *:${config.server.port}`);
});