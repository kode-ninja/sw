const youtubeVideo = require('./youtubeVideo');
const luxon = require("luxon");

let playlist = [];

module.exports = (io, socket) => {

    const createPlaylistItem = (youtubeVideoId, youtubeVideoURL, youtubeApiData) => {
        const firstItem = youtubeApiData.data.items[0];
        const snippet = firstItem.snippet;
        const contentDetails = firstItem.contentDetails;

        return {
            id: youtubeVideoId,
            url: youtubeVideoURL,
            title: snippet.title,
            thumbnail_url: snippet.thumbnails.default.url,
            duration: luxon.Duration.fromISO(contentDetails.duration).toFormat('hh:mm:ss')
        }
    }

    const onAddVideo = async ({url}) => {
        console.log('addVideo', url);

        try {
            youtubeVideo.validateVideoURLOrFail(url);
            const videoId = youtubeVideo.extractVideoId(url);

            const existsInPlaylist = playlist.find(video => video.id === videoId);
            if (existsInPlaylist) {
                sendFailedAddingToPlaylist('This video is already in the playlist.');

                return;
            }

            const youtubeApiData = await youtubeVideo.fetchVideoDataFromYoutubeAPI(videoId);
            const playlistItem = createPlaylistItem(videoId, url, youtubeApiData);
            playlist.push(playlistItem);
            sendAddVideoToAll(playlistItem);
        } catch (e) {
            console.error('addVideos() failed', e);
            sendFailedAddingToPlaylist();
        }
    }

    const onRemoveVideo = () => {
        console.log('removeVideo');
        playlist.shift();
        sendRemoveVideoToAll();
    }

    const onGetPlaylist = () => {
        console.log('onGetPlaylist');
        sendPlaylist();
    }

    const sendAddVideoToAll = (video) => {
        console.log('sendAddVideoToAll');
        io.sockets.emit('playlist:add', video);
    }

    const sendRemoveVideoToAll = () => {
        console.log('sendRemoveVideoToAll');
        io.sockets.emit('playlist:remove');
    }

    const sendPlaylist = () => {
        console.log(`sendPlaylist: ${playlist.length} items`);
        socket.emit('playlist', playlist);
    }

    const sendFailedAddingToPlaylist = (reason = '') => {
        socket.emit('playlist:add:failed', reason);
    }

    socket.on("playlist:get", onGetPlaylist);
    socket.on("playlist:add", onAddVideo);
    socket.on("playlist:remove", onRemoveVideo);
}


