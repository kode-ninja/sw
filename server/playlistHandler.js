const youtubeVideo = require('./youtubeVideo');
const luxon = require("luxon");

let playlist = new Map();

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

    const addVideo = async ({url}) => {
        console.log('addVideo', url);

        try {
            youtubeVideo.validateVideoURLOrFail(url);
            const videoId = youtubeVideo.extractVideoId(url);

            if (playlist.has(videoId)) {
                sendFailedAddingToPlaylist('Video is already in the playlist.');

                return;
            }

            const youtubeApiData = await youtubeVideo.fetchVideoDataFromYoutubeAPI(videoId);
            const playlistItem = createPlaylistItem(videoId, url, youtubeApiData);
            playlist.set(videoId, playlistItem);
            sendPlaylistToAll();
        } catch (e) {
            console.error('addVideos() failed', e);
            sendFailedAddingToPlaylist();
        }
    }

    const removeVideo = ({videoId}) => {
        console.log('removeVideo', videoId);
        if (playlist.has(videoId)) {
            playlist.delete(videoId);
            sendPlaylistToAll();
        } else {
            // TODO
            console.error(`removeVideo(): videoId "${videoId}" does not exist`);
            sendPlaylist();//  if video was not found, refresh the user's playlist to resolve playlist's client-server synchronization issue
        }
        sendPlaylist();
    }

    const getPlaylist = async () => {
        console.log('getPlaylist');
        sendPlaylist();
    }

    const sendPlaylist = () => {
        console.log(`sendPlaylist: ${playlist.size} items`);
        socket.emit('playlist:refresh', [...playlist.values()]);
    }

    const sendPlaylistToAll = () => {
        console.log(`sendPlaylistToAll: ${playlist.size} items`);
        io.sockets.emit('playlist:refresh', [...playlist.values()]);
    }

    const sendFailedAddingToPlaylist = (reason = '') => {
        socket.emit('playlist:add:failed', reason);
    }

    socket.on("playlist:get", getPlaylist);
    socket.on("playlist:add", addVideo);
    socket.on("playlist:remove", removeVideo);
}


