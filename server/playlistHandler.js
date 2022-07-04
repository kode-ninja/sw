const youtubeVideo = require('./youtubeVideo');

module.exports = (io, socket) => {

    let playlist = new Map();

    const createPlaylistItem = (youtubeVideoURL, youtubeApiData) => {
        const video = youtubeApiData.data.items[0].snippet;
        
        return {
            url: youtubeVideoURL,
            title: video.title,
            thumbnail: video.thumbnails.default.url
        }
    }

    const addVideo = async ({url}) => {
        console.log('addVideo', url);

        try {
            youtubeVideo.validateVideoURLOrFail(url);
            const videoId = youtubeVideo.extractVideoId(url);
            const youtubeApiData = await youtubeVideo.fetchVideoDataFromYoutubeAPI(videoId);
            const playlistItem = createPlaylistItem(url, youtubeApiData);
            playlist.set(videoId, playlistItem);
            sendPlaylist();
        } catch (e) {
            console.error('addVideos() failed', e);
            // TODO: emit an error message to the user
        }
    }

    const getPlaylist = async () => {
        console.log('getPlaylist');
        sendPlaylist();
    }

    const sendPlaylist = () => {
        console.log(`sendPlaylist: ${playlist.size} items`);
        socket.emit('playlist:refresh', [...playlist.values()]);
    }

    socket.on("playlist:get", getPlaylist);
    socket.on("playlist:add", addVideo);
}


