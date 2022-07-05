# Fullstack Home Assignment

This is a web interface that allows the user to create a playlist of YouTube videos, and plays them in order and a server backend, which stores, and serves the playlist.

Two projects are included: [client](https://github.com/kode-ninja/sw/tree/master/client) and [server](https://github.com/kode-ninja/sw/tree/master/server):
- server: Socket.io server that serves the React application
- client: React application 

## Quick Start
Install both the [client](https://github.com/kode-ninja/sw/tree/master/client) and [server](https://github.com/kode-ninja/sw/tree/master/server) apps: a `README.md` file is available for each of the projects with detailed instructions.

And then:
- Start the server
- Start the client app

## Scale (server)

Assuming there are very few playlist editors, but many viewers:

### Implications
- Server will get hit more often with the following requests:
  - `playlist:get` - user just connected and gets the playlist
  - `playlist:remove` - user finished to watch a video and requests its removal from the list

### Suggested optimizations
Background: Unlike the current implementation, in which the playlist is stored in-memory, in production it will be persisted in a DB (to persist the playlist in case of server restart or crash).

#### In-memory data store
To optimize `playlist:get` requests, the playlist can be loaded into memory (from DB) and serve clients from memory
- This solution will reduce DB load (fewer queries will hit the DB).
- Each change to the playlist (i.e. `playlist:remove`, `playlist:add`) should then be applied both to DB **and** memory store, while updating the DB can occur async (eventual consistency).

#### Multiple Socket.IO servers (nodes)
In case the server is the bottleneck, it is possible to deploy multiple Socket.IO servers (nodes), while enabling [cookie-based sticky session](https://socket.io/docs/v4/using-multiple-nodes/#enabling-sticky-session).

#### Clustered in-memory data store
In case memory is the bottleneck, there are in-memory data stores which support clusters, like [Redis](https://redis.io/commands/cluster-nodes/).

