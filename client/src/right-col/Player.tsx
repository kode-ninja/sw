/**
 * https://www.npmjs.com/package/react-youtube
 */

import {useContext} from "react";
import {PlaylistContext} from "../playlist-context/PlaylistContextProvider";
import YouTube from 'react-youtube';
import "./Player.css";

const reactYouTubeOptions = {
    width: '100%',          // responsive width & height: rest of the CSS is in Player.css
    height: '100%',
    playerVars: {
        autoplay: 1,        // https://developers.google.com/youtube/iframe_api_reference#Autoplay_and_scripted_playback
    },
    origin: window.location // Solves JS Error: Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin
}

const Player = () => {
    const playlistContext = useContext(PlaylistContext) ;
    const playlistVideos = playlistContext?.playlist;

    if (!playlistVideos || playlistVideos.length === 0)
        return null;

    const firstPlaylistVideo = playlistVideos[0];

    const onEnd = () => {
        playlistContext?.removeVideo(firstPlaylistVideo.id);
    }

    return (
        <YouTube className="player" videoId={firstPlaylistVideo.id} opts={reactYouTubeOptions} onEnd={onEnd} />
    );
}

export default Player;