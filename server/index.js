require('dotenv').config();
const config = require('./config');
const express = require('express');
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const registerPlaylistHandlers = require("./playlistHandler");

app.use(cors());

if (!config.youtube.api_key) {
    console.error('"YOUTUBE_DATA_API_KEY" is missing in .env file');
    return;
}


const server = require("http").createServer();
const io = new Server(server, {
    cors: {
        origin: `${config.app.schema}://${config.app.host}:${config.app.port}`,
    }
});

io.on('connection', (socket) => {
    registerPlaylistHandlers(io, socket);
});

server.listen(config.server.port, () => {
    console.log(`Server is listening on *:${config.server.port}`);
});