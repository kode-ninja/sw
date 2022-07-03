module.exports = (io, socket) => {
    let playlistVideos = new Map();

    const addVideo = (youtubeURL) => {
        console.log('addVideo', youtubeURL);
    }

    const getPlaylist = () => {
        console.log('getPlaylist');
        sendPlaylist();
    }

    const sendPlaylist = () => {
        console.log('sendPlaylist');
        socket.emit('playlist:all', [...playlistVideos.values()]);
    }

    socket.on("playlist:get", getPlaylist);
    socket.on("playlist:add", addVideo);
}


