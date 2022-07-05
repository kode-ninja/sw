# Home Assignment Socket Server

## Introduction
A web-sockets server for the client app, using [socket.io](https://socket.io/).

Functionality includes:
- Stores/serves the playlist.
- All clients see the same playlist.
- Once a user added a video, other clients see the addition.
- YouTube API is being used to fetch video data

## Quick Start

- Install the server by running `npm install` in the `server` directory.
- Add a `.env` file in the root directory and set a `YOUTUBE_DATA_API_KEY` entry.
  - For example: `YOUTUBE_DATA_API_KEY=abcdEFG`
  - A video explaining [How to Get YouTube API Key](https://www.youtube.com/watch?v=N18czV5tj5o).
- Make sure port `3001` is available on your computer, or set `SERVER_PORT` in your `.env` file.
- Start the server by running `npm start` in the `server` directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts/runs the server.


### `npm nodemon`

Starts/runs the server using [nodemon](https://www.npmjs.com/package/nodemon).
